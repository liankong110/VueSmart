<template>

  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside
      width="200px"
      style="background-color: rgb(238, 241, 246)"
    >
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i
            class="el-icon-setting"
            style="margin-right: 15px"
          ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <el-row>
          <el-col :span="4">
            <i class="el-icon-edit"></i>
            <i class="el-icon-share"></i>
            <i class="el-icon-delete"></i>
            <el-button
              type="primary"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-button
            type="default"
            round
            disabled
          >default</el-button>
          <el-button
            type="success"
            icon="el-icon-search"
            round
          >success</el-button>
          <el-button
            type="info"
            round
          >info</el-button>
          <el-button type="warning">warning</el-button>
          <el-button
            type="danger"
            :loading="true"
          >danger</el-button>
          <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-row>

        <el-row style="margin-top:30px;"> 
          <el-radio
            v-model="aaa"
            label="1"
          >备选项</el-radio>
          <el-radio
            v-model="aaa"
            label="2"
          >备选项</el-radio>
          <el-checkbox v-model="checked">备选项</el-checkbox>

          <el-checkbox-group  v-model="checklist" :min="2" :max="3">
            <el-checkbox label="A"></el-checkbox>
             <el-checkbox label="B"></el-checkbox>
              <el-checkbox label="C"></el-checkbox>
               <el-checkbox label="D"></el-checkbox>
                <el-checkbox label="E"></el-checkbox>
              <el-checkbox label="选中且禁用" disabled></el-checkbox>
          </el-checkbox-group>

          <el-input v-model="mytext" placeholder="......" suffix-icon="el-icon-date" clearable></el-input>

          <el-date-picker type="date" v-model="val1" placeholder="..." format="yyyy 年 MM 月 dd 日"> </el-date-picker>
           
        </el-row>

        <el-table :data="tableData">
          <el-table-column
            prop="date"
            label="日期"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
          >
          </el-table-column>
        </el-table>
      </el-main>

      <el-foot>
        <div>
          <h1>KKKK</h1>
        </div>
      </el-foot>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      aaa: "1",
      checked: true,
      checklist:['A','B'],
      mytext:"你好啊",
      val1:''
    };
  },
  mounted(){
    let name=this.checked;
    this.$message.warning(`....${name}`);
  }
};
</script>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>