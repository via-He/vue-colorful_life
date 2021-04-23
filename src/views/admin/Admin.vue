<template>
    <el-container>
        <!--头部-->
        <el-header id="header">
            <div class="container">
                <AdminHeader></AdminHeader>
            </div>
        </el-header>
        <!--主栏-->
        <el-container class="container">
            <el-main id="main">
                <div class="container">
                    <div class="row">

                        <!-- Content -->
                        <div id="content" class="8u skel-cell-important">
                            <section>
                                <header>
                                    <h2>精彩推荐</h2>
                                    <span class="byline">Integer sit amet pede vel arcu aliquet pretium</span>
                                </header>
                                <!--                                    <a href="#" class="image full"><img src="../images/pic07.jpg" alt=""/></a>-->
                                <div class="block">

                                </div>
                                <div class="block">
                                    <el-pagination class="mpage"
                                                   layout="prev, pager, next"
                                                   :total="1000">
                                    </el-pagination>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </el-main>
            <!--底栏-->
            <el-footer>
                <Bottom></Bottom>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import Bottom from "../../components/Bottom";
    import Aside from "../../components/Aside";
    import Header from "../../components/Header";
    import AdminHeader from "../../components/admin/AdminHeader";
    export default {
        name: "Admin",
        components: {AdminHeader, Header, Aside, Bottom}
    }
</script>

<style scoped>

</style>