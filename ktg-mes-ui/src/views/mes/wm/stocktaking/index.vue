<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="盘点单编号" prop="takingCode">
        <el-input
          v-model="queryParams.takingCode"
          placeholder="请输入盘点单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘点单名称" prop="takingName">
        <el-input
          v-model="queryParams.takingName"
          placeholder="请输入盘点单名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘点日期" prop="takingDate">
        <el-date-picker clearable
          v-model="queryParams.takingDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择盘点日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="盘点人用户名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入盘点人用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘点人" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入盘点人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘点类型" prop="takingType">
        <el-select v-model="queryParams.takingType" placeholder="请选择盘点类型" clearable>
          <el-option
            v-for="dict in dict.type.mes_stocktaking_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="仓库ID" prop="warehouseId">
        <el-input
          v-model="queryParams.warehouseId"
          placeholder="请输入仓库ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库编码" prop="warehouseCode">
        <el-input
          v-model="queryParams.warehouseCode"
          placeholder="请输入仓库编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库名称" prop="warehouseName">
        <el-input
          v-model="queryParams.warehouseName"
          placeholder="请输入仓库名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择单据状态" clearable>
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['wm:stocktaking:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['wm:stocktaking:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['wm:stocktaking:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wm:stocktaking:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stocktakingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="盘点单ID" align="center" prop="takingId" />
      <el-table-column label="盘点单编号" align="center" prop="takingCode" />
      <el-table-column label="盘点单名称" align="center" prop="takingName" />
      <el-table-column label="盘点日期" align="center" prop="takingDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.takingDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="盘点人用户名" align="center" prop="userName" />
      <el-table-column label="盘点人" align="center" prop="nickName" />
      <el-table-column label="盘点类型" align="center" prop="takingType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.mes_stocktaking_type" :value="scope.row.takingType"/>
        </template>
      </el-table-column>
      <el-table-column label="仓库ID" align="center" prop="warehouseId" />
      <el-table-column label="仓库编码" align="center" prop="warehouseCode" />
      <el-table-column label="仓库名称" align="center" prop="warehouseName" />
      <el-table-column label="单据状态" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wm:stocktaking:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wm:stocktaking:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改库存盘点记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="盘点单编号" prop="takingCode">
          <el-input v-model="form.takingCode" placeholder="请输入盘点单编号" />
        </el-form-item>
        <el-form-item label="盘点单名称" prop="takingName">
          <el-input v-model="form.takingName" placeholder="请输入盘点单名称" />
        </el-form-item>
        <el-form-item label="盘点日期" prop="takingDate">
          <el-date-picker clearable
            v-model="form.takingDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择盘点日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="盘点人用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入盘点人用户名" />
        </el-form-item>
        <el-form-item label="盘点人" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入盘点人" />
        </el-form-item>
        <el-form-item label="盘点类型" prop="takingType">
          <el-select v-model="form.takingType" placeholder="请选择盘点类型">
            <el-option
              v-for="dict in dict.type.mes_stocktaking_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库ID" prop="warehouseId">
          <el-input v-model="form.warehouseId" placeholder="请输入仓库ID" />
        </el-form-item>
        <el-form-item label="仓库编码" prop="warehouseCode">
          <el-input v-model="form.warehouseCode" placeholder="请输入仓库编码" />
        </el-form-item>
        <el-form-item label="仓库名称" prop="warehouseName">
          <el-input v-model="form.warehouseName" placeholder="请输入仓库名称" />
        </el-form-item>
        <el-form-item label="单据状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listStocktaking, getStocktaking, delStocktaking, addStocktaking, updateStocktaking } from "@/api/mes/wm/stocktaking";

export default {
  name: "Stocktaking",
  dicts: ['mes_stocktaking_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 库存盘点记录表格数据
      stocktakingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        takingCode: null,        takingName: null,        takingDate: null,        userName: null,        nickName: null,        takingType: null,        warehouseId: null,        warehouseCode: null,        warehouseName: null,        status: null,      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        takingCode: [
          { required: true, message: "盘点单编号不能为空", trigger: "blur" }
        ],        takingDate: [
          { required: true, message: "盘点日期不能为空", trigger: "blur" }
        ],        takingType: [
          { required: true, message: "盘点类型不能为空", trigger: "change" }
        ],      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询库存盘点记录列表 */
    getList() {
      this.loading = true;
      listStocktaking(this.queryParams).then(response => {
        this.stocktakingList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        takingId: null,        takingCode: null,        takingName: null,        takingDate: null,        userName: null,        nickName: null,        takingType: null,        warehouseId: null,        warehouseCode: null,        warehouseName: null,        status: "0",        remark: null,        attr1: null,        attr2: null,        attr3: null,        attr4: null,        createBy: null,        createTime: null,        updateBy: null,        updateTime: null      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.takingId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加库存盘点记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const takingId = row.takingId || this.ids
      getStocktaking(takingId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库存盘点记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.takingId != null) {
            updateStocktaking(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStocktaking(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const takingIds = row.takingId || this.ids;
      this.$modal.confirm('是否确认删除库存盘点记录编号为"' + takingIds + '"的数据项？').then(function() {
        return delStocktaking(takingIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wm/stocktaking/export', {
        ...this.queryParams
      }, `stocktaking_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
