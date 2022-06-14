<template>
  <div class="box">
    <el-container>
      <el-header class="el-header">
        <div class="title">
          <i class="el-icon-user"></i>
          <span>角色管理</span>
        </div>
      </el-header>

      <el-container>
        <el-aside width="300px" class="el-aside">
          <el-button type="text"><i class="el-icon-user"></i>新增角色</el-button>
          <el-button type="text"><i class="el-icon-user"></i>新增分组</el-button>
          <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu :index="item.id.toString()" v-for="(item) in roleGroup" :key="item.id">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>{{ item.groupName }}</span>
              </template>
              <el-menu-item :index="item.id+'-'+items.id" v-for="(items) in item.complete" :key="items.id">
                {{items.roleName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <div class="subject">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="角色成员" name="first">
                角色成员
              </el-tab-pane>
              <el-tab-pane label="功能权限" name="second">
                <div class="second-title">
                  <span class="second-span">设置角色对应的功能操作、应用管理、后台管理权限</span>
                </div>
                <div class="second-subject" v-for="item in cityOption" :key="item.label">
                  <el-checkbox class="item" @change="handleCheckAllChange($event,item)" :indeterminate="item.isIndeterminate" v-model="item.checked">{{item.label}}</el-checkbox>
                  <div class="item-v">
                    <el-checkbox-group v-model="item.arr" @change="handleCheckedCitiesChange($event,item)">
                      <el-checkbox v-for="city in item.children" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-tab-pane>

              <div style="margin: 15px 0;"></div>

              <el-tab-pane label="数据范围" name="third">数据范围</el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getRoleGroupListApi, getRoleListApi } from "@/assets/api/api";
import menudata from "@/assets/josn/menudata.json";
const cityOptions = menudata;
export default {
  data() {
    return {
      cityOption: [],
      activeName: "second",
      groupName: [],
      role: [],
      roleGroup: [],
    };
  },

  created() {
    this.getMenuList();
    this.cityOption = cityOptions.map((item) => {
      let data = JSON.parse(JSON.stringify(item));
      data.isIndeterminate = false;
      data.children = data.children.map((vm) => vm.label);
      data.arr = [];
      return data;
    });
  },
  methods: {
    handleCheckAllChange(val, group) {
      group.isIndeterminate = false;
      group.arr = val ? group.children : [];
    },
    handleCheckedCitiesChange(value, group) {
      console.log(value);
      console.log(group);
      let checkedCount = value.length;
      group.checked = checkedCount === group.children.length;
      group.isIndeterminate =
        checkedCount > 0 && checkedCount < group.children.length;
    },

    forRoleGroup() {
      var arr = [];
      this.group.forEach((item) => {
        arr.push(item.groupName);
      });
      this.groupName = arr;
    },
    async getMenuList() {
      let [roleList, roleGroupList] = await Promise.all([
        getRoleListApi(),
        getRoleGroupListApi(),
      ]);
      this.role = roleList.data.data.rows;
      this.roleGroup = roleGroupList.data.data.rows;
      this.roleGroup.forEach((item) => {
        item.complete = this.role.filter((items) => items.groupId == item.id);
      });
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 60px);
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  & .el-header {
    border-bottom: 1px solid #cdcdcd;
    display: flex;
    align-items: center;
    & .title {
      & i {
        font-size: 30px;
        margin-right: 10px;
      }
      & span {
        font-size: 30px;
      }
    }
  }
  & .el-aside {
    border-right: 1px solid #cdcdcd;
    height: calc(100vh - 60px - 60px);
    & .el-menu-vertical-demo {
      border: 0;
    }
  }
  & .subject {
    & .second-title {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    & .second-subject {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      & .item {
        background: #e9eff3;
        margin: 0;
        padding: 20px;
      }
      & .item-v {
        padding: 20px;
        & div {
          padding: 20px;
          display: flex;
          gap: 0 35px;
        }
      }
    }
  }
}
</style>