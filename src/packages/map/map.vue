<template>
    <div id="vehicle-map" class="map"></div>
</template>

<script>
  import "ol/ol.css";
  import { Map,View,Feature,Overlay } from "ol";
  import {  Point } from 'ol/geom'
  import {  Style, Icon, Text, Circle, Fill, Stroke} from 'ol/style'

  import VectorSource from 'ol/source/Vector';
  import {Tile as TileLayer, Vector as VectorLayer ,MapboxVector as MapboxVectorLayer} from 'ol/layer';
  import OSM from "ol/source/OSM";
  import {XYZ as xyzSource} from "ol/source";
  import { ref, reactive,shallowReactive ,toRefs,toRef,onMounted,onBeforeUnmount } from 'vue'

  export default {
    name: 'ol-map',
    setup(props,context){
      let pageData = reactive({
        data: [
            {
                lng: 114.123,
                lat: 48.234
            }
        ],
        map: null,
        mapEle: null,
      });

      function initMap() {
        pageData.mapEle = document.getElementById('vehicle-map');
        pageData.map = new Map({
            //地图容器div的ID
            target: pageData.mapEle,
            //地图容器中加载的图层
            layers: [
              new TileLayer({
                source: new xyzSource({
                  url: 'https://api.mapbox.com/styles/v1/lanye/ckwyq947o0j2j15o2pmk6bv60/tiles/256/{z}/{x}/{y}??title=copy&access_token=pk.eyJ1IjoibGFueWUiLCJhIjoiY2t3aDltejg0MHZ6bjJ1bXBrenM5bWd1OCJ9.NDXL9ifanuh9WNmm6PR9Fw&zoomwheel=true&fresh=true#5.04/42.26/116.16'
                })
              })
            ],
            view: new View({
                //设置地图投影坐标系
                // projection: pos,
                projection: 'EPSG:4326',
                center: [pageData.data[0].lng, pageData.data[0].lat],
                zoom: 12
            }),
        });
       
        /*********************根据坐标显示点位**************************/
        // 画圆 10 - 60
        let basicsDiff = 60 - 10
        let scale = 1
        let max = pageData.data[0].count
        let min = pageData.data[0].count

        // 计算最大值最小值
        pageData.data.forEach(item=>{
          if(max < item.count){
            max = item.count
          }
          if(min > item.count){
            min = item.count
          }
        })
        let diff = max - min
        if(diff == 0){
          scale = basicsDiff/2 * max
        }else{
          scale = basicsDiff / diff
        }

        // 创建图标样式
        // 计算圆形的大小
        var fill = new Fill({
          color: '#E69B03'
        });
        //创建空的矢量容器
        let vectorSource = new VectorSource({});
        for (var i = 0; i < pageData.data.length; i++) {
          // 如果这个点的数量为0，就不显示
          if(pageData.data[i].count != 0){
            //创建图标特性
            var point = new Point([pageData.data[i].lng, pageData.data[i].lat]);
            var pointFeature = new Feature(point);
            pointFeature.setStyle(
              new Style({
                image: new Circle({
                  fill: fill,
                  // stroke: stroke,
                  radius: pageData.data[i].count * scale
                })
              })
            )
            //将图标特性添加进矢量中
            vectorSource.addFeature(pointFeature);
          }
        }
        
        //创建图标层
        var vectorLayer = new VectorLayer({
          source: vectorSource
        })

        // 点位加到地图里面
        pageData.map.addLayer(vectorLayer);
      }

      onMounted(()=>{
        initMap()
      })

      onBeforeUnmount(()=>{
        clearMap()
      })
      function clearMap(){
        document.getElementById('vehicle-map').innerHTML = ''
        pageData.mapEle = null
        pageData.map = null
      }
      return{
        ...toRefs(pageData)
      }
    }
  }
</script>

<style lang="css" scoped>
.map{
    width: 100%;
    height: 100%;
}
</style>