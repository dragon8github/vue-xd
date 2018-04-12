<template>
    <div>
        
    </div>
</template>
<script>
export default {
    beforeMount () {
        let appData = {
            Ip: this.$route.params.Ip,
            SystemName: this.$route.params.SystemName,
            Version: this.$route.params.Version,
            Token:this.$route.params.Token,
            UserId: this.$route.params.UserId
        }
        // http://localhost:8081/index.html#/member/192.168.0.0/IOS/2.0/3768645a-1433-11e6-a74c-02004c4f4f50/3768645a-1433-11e6-a74c-02004c4f4f50
        this.$store.dispatch('setAppData',appData)
        this.$router.push('/home')
    }
}
</script>