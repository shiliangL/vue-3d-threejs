<!--
 * @Author: shiliangL
 * @Date: 2021-07-25 17:50:01
 * @LastEditTime: 2021-07-28 10:58:27
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="wx100">
    <div
      ref="map"
      class="map"
    />
  </div>
</template>

<script>

export default {
  meta: {
    title: '地图定位',
    wxAuth: false,
    keepAlive: true
  },
  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        const { BMapGL } = window
        if (BMapGL) this.initMap(BMapGL)
      }, 200)
    })
  },
  methods: {
    initMap(BMapGL) {
      const el = this.$refs['map']
      this.map = new BMapGL.Map(el)
      this.map.centerAndZoom(new BMapGL.Point(114.064552, 22.548456), 16)

      const LocationControl = new BMapGL.LocationControl({
        anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT
      })

      LocationControl.addEventListener('locationSuccess', (e) => {
        console.log(e, '-控件定位-')
      })
      LocationControl.addEventListener('locationError', (e) => {
        // 定位失败事件
        console.log(e, '-控件定位-')
      })
      this.map.addControl(LocationControl)

      const CityListControl = new BMapGL.CityListControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMapGL.Size(10, 5)
      })
      this.map.addControl(CityListControl)
      this.getCurrentPosition(BMapGL)
    },
    getCurrentPosition(BMapGL) {
      const geolocation = new BMapGL.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, // 显示定位按钮，默认：true
        buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new BMapGL.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      geolocation.enableSDKLocation()
      geolocation.getCurrentPosition((res) => {
        console.log(res, '-自定义定位')
        if (res.point) this.map.panTo(res.point)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wx100 {
  position: relative;
  .map {
    height: 100%;
    width: 100%;
  }
}
</style>
