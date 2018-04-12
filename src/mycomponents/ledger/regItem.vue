<template>
    <li class="listviewItem">
        <div class="busitem">

            <div class="row">
                <div class="left-warp">
                    <a class="username">转款人: {{data.reserve_5}}</a>
                    <span class="fsd"></span>
                </div>  
                <div class="right-warp">
                     <a>{{data.claimDate | timeYMD}}</a>
                </div>
            </div>

            <div class="row flex">
                <div class="left-warp">
                    <span class="num-span">
                       {{data.reserve_1}}
                    </span>元（{{data.reserve_2}}）
                </div>
                <div class="right-warp">
                    <i class="circle-blue"></i>
                    {{data.state}}
                </div>
            </div>

            <div class="row-last">
            	<div class="row-last-top">
            		<span class="text-span">交易场所：</span>
            		<span class="text-span-gray">{{data.reserve_4 || '未知'}}</span>
            	</div>
            
            	<div class="row-last-bottom">
            		<div class="left-warp">
            			<span class="text-span">交易类型：</span>
            			<span class="text-span-gray">{{ data.reserve_3 || '未知' }}</span>
            		</div>
            		<div class="right-warp">
            			<i class="circle circle-blue"></i>
            			<a  class="btn-link" :style="{color:data.certificate_picture_url==null||data.certificate_picture_url=='' ? 'gray':'#2DA5FF'}" @click="goToDraw(data.certificate_picture_url)">查看凭证</a>
            		</div>
            	</div>
            </div>
            
        </div>
    </li>
</template>

<script>
//Toast组件
import Toast from 'components/toast/index.js';
export default {
    name: 'regItem',
    props: ['data'],
    methods: {
        goToDraw (data) {
             if(data==null||data=='') {
                    Toast("未上传凭证")
                    return;
             }
            // 自定义的数据对象
            let drawMap = {title: `${this.data.reserve_5}的凭证`, list: [data], index: 0}
            this.$store.dispatch('setDrawMap', drawMap);
            this.$router.push('/drawMap')
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../sass/list";

    .reserve_3 {
        margin-right: pxToRem(10px);
    }
</style>