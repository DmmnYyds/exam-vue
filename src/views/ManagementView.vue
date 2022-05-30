<template>
  <div class="box">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="真实姓名" width="150" align="center">
      </el-table-column>
      <el-table-column prop="avatarName" label="昵称" width="200" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100" align="center">
        <template slot-scope="scope">{{scope.row.sex==1?'男':'女'}}</template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200" align="center">
      </el-table-column>
      <el-table-column prop="provinceNo" label="省" width="100" align="center">
      </el-table-column>
      <el-table-column prop="cityNo" label="市" width="100" align="center">
      </el-table-column>
      <el-table-column prop="areaNo" label="区/县" width="100" align="center">
      </el-table-column>
      <el-table-column prop="desc" label="简介" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary" plain>编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import citydata from "@/assets/josn/citydata.json";
import { getUserListApi } from "@/assets/api/api";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      province: "",
    };
  },
  created() {
    this.province = citydata;
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { pageSize, pageNum } = this;
      let res = await getUserListApi({
        pageSize,
        pageNum,
      });
      if (res.data.status == 1) {
        this.tableData = res.data.data.data.rows;
        this.totalCount = res.data.data.data.count;
        console.log(res);
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getUserList();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 60px);
  padding: 30px;
  box-sizing: border-box;
}
</style>