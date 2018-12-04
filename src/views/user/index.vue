 <template>

  <el-row>
    <el-col :span="24">
      <el-form
        :inline="true"
        ref="myform"
        :model="myform"
        style="float:left;"
      >
        <el-form-item label="用户名">
          <el-input
            placeholder="请输入用户名"
            v-model="myform.userName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="getUserList"
            type="primary"
          >查询</el-button>

        </el-form-item>
        <el-form-item>
          <el-button
            @click="add"
            type="primary"
          >新增</el-button>

        </el-form-item>
      </el-form>

    </el-col>
    <el-table
      :data="userList"
      style="width: 100%"
      stripe
      border
      overflow="auto"
    >
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="loginId"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="Name"
        label="真实姓名"
      >
      </el-table-column>
      <el-table-column
        prop="Sex"
        label="性别"
        :formatter="sexFromat"
        width="50px"
      >
      </el-table-column>
      <el-table-column
        prop="Phone"
        label="电话"
      />
      <el-table-column
        prop="Email"
        label="邮箱"
      />
      <el-table-column
        prop="Company"
        label="所属公司"
      />
      <el-table-column
        prop="Position"
        label="职位"
      />
      <el-table-column
        prop="CreateTime"
        label="注册时间"
        :formatter="dateFromat"
      >
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="myform.cuttentpage"
      :page-size="page.PageSize"
      layout="total, prev, pager, next"
      :total="page.TotalCount"
      style="text-align:right"
    >
    </el-pagination>

  </el-row>

</template>

  <script>
import * as userApi from "../../api/user";
import * as utils from "../../js/util";
import moment from "moment";
export default {
  data() {
    return {
      userList: [],
      myform: {
        userName: "",
        cuttentpage: 1
      },
      page: {}
    };
  },
  methods: {
    getUserList: function() {
      userApi.requstAllList
        .r({ userName: this.myform.userName, page: this.myform.cuttentpage })
        .then(res => {
          if (res && res.data.Code == 0) {
            this.userList = res.data.model;
            console.log(this.userList);
            this.page = res.data.pager;
          } else {
            this.$message(res.Message);
          }
        })
        .catch(utils.catchError);
    },
    dateFromat: function(row, column) {
      var date = row[column.property];
      return moment(date).format("YYYY-MM-DD");
    },
    sexFromat: (r, c) => {
      var sex = r[c.property];
      if (sex == false) {
        return "男";
      } else {
        return "女";
      }
    },
    add() {
      this.$router.push({ Name: "新增", path: "/user/add" });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.myform.cuttentpage = val;
      this.getUserList();
    },
    handleEdit(index, row) {
      this.$router.push({ path: `/user/add`, query: { Id: row.Id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userApi.remove.r({ Id: row.Id }).then(res => {
            if (res.data && res.data.Code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
               this.getUserList();
            } else {
              this.$message.warning(res.data.Message);
            }
          }).catch(utils.catchError);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getUserList();
  }
};
</script>