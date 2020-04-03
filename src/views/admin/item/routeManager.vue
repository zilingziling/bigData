<template>
  <div class="routeManager">
    <div class="routeManager-header">
      <a-button type="primary" @click="edit(1)">新增</a-button>
    </div>
    <div>
      <a-table
        :rowKey="record => record.id"
        :columns="columns"
        @change="onTableChange"
        :dataSource="dataSource"
        :pagination="pagination"
        class="global_table"
      >
        <span slot="status" slot-scope="text">
          <span v-if="text == 1">启用</span>
          <span v-else>禁用</span>
        </span>
        <span slot="imitate" slot-scope="text">
          <span v-if="text == 1">启用</span>
          <span v-else>禁用</span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:void(0);" @click="edit(2,record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确认删除?" @confirm="onDelete(record.id)" okText="确认" cancelText="取消">
            <a href="javascript:void(0);">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <a-modal
      :visible="modalVisible"
      :title="modalTitle"
      @ok="modalOK"
      @cancel="modalCancel"
      width="600px"
    >
      <a-form :form="form">
        <a-form-item
          label="菜单id"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 15 }"
          style="display:none;"
        >
          <a-input v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="分组" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-select
            :options="GroupList"
            v-decorator="[
              'groupId',
              {rules: [{ required: true, message: '请选择分组!' }]}
            ]"
          ></a-select>
        </a-form-item>
        <a-form-item label="路由名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
          'name',
          {rules: [{ required: true, message: '请填写路由名称!' },{whitespace:true, message: '名称不能为空格!' }]}
        ]"
          />
        </a-form-item>
        <a-form-item label="路由地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
          'route',
          {rules: [{ required: true, message: '请填写路由地址!' },{whitespace:true, message: '地址不能为空格!' }]}
        ]"
          />
        </a-form-item>
        <a-form-item label="序号" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
          'sort',
          {rules: [{ required: true, message: '请填写序号!' },{whitespace:true, message: '序号不能为空格!' }]}
        ]"
          />
        </a-form-item>
        <a-form-item label="服务端路由编码" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-select
            :options="CodeList"
            v-decorator="[
              'code',
              {rules: [{ required: true, message: '请选择路由编码!' }]}
            ]"
          ></a-select>
        </a-form-item>
        <a-form-item label="启用状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-radio-group v-decorator="['status', { initialValue: '1' }]">
            <a-radio value="1" style="color:#fff">启用</a-radio>
            <a-radio value="0" style="color:#fff">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="模拟状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-radio-group v-decorator="['imitate', { initialValue: '0' }]">
            <a-radio value="1" style="color:#fff">启用</a-radio>
            <a-radio value="0" style="color:#fff">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  routeSave,
  routeList,
  routeDelete,
  groupData,
  routeCode
} from "@/request/admin";
@Component({})
export default class RouteManager extends Vue {
  private columns: Array<any> = [
    {
      title: "序号",
      key: "sort",
      dataIndex: "sort"
    },
    {
      title: "路由名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "路由地址",
      dataIndex: "route",
      key: "route"
    },
    {
      title: "分组名称",
      dataIndex: "groupName",
      key: "groupName"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      scopedSlots: { customRender: "status" }
    },
    {
      title: "模拟状态",
      dataIndex: "imitate",
      key: "imitate",
      scopedSlots: { customRender: "imitate" }
    },
    {
      title: "模块代码",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "操作",
      key: "action",
      scopedSlots: { customRender: "action" }
    }
  ];
  private dataSource: Array<any> = [];
  private GroupList: Array<any> = [];
  private CodeList: Array<any> = [];
  private modalVisible: boolean = false;
  public form: any;
  private modalTitle: String = "新增分组";
  private pagination: any = {};

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }
  private mounted() {
    this.$nextTick(() => {
      this.getRouteList();
      this.getGroupData();
      this.getRouteCode();
    });
  }
  public getRouteList(params = { page: 1, limit: 20 }) {
    routeList().then(res => {
      if (res.code == 0) {
        this.dataSource = res.data.list;
      }
    });
  }
  public getGroupData() {
    groupData().then(res => {
      if (res.code == 0) {
        this.GroupList = this.formatterSelectList(res.data, "id");
      }
    });
  }
  public getRouteCode() {
    routeCode().then(res => {
      if (res.code == 0) {
        this.CodeList = this.formatterSelectList(res.data, "code");
      }
    });
  }
  public onTableChange(pagination: any, filters: any, sorter: any) {
    const pager = { ...this.pagination };
    pager.current = pagination.current;
    this.pagination = pager;
    this.getRouteList({
      page: pager.current,
      limit: pager.pageSize
    });
  }
  public onDelete(id: number) {
    const { getRouteList } = this;
    routeDelete({ id }).then(res => {
      if (res.code == 0) {
        this.$notification["success"]({
          message: "提示",
          description: res.msg
        });
        getRouteList();
      }
    });
  }
  public edit(num: number, record: any) {
    this.modalVisible = true;

    if (num == 1) {
      this.modalTitle = "新增路由";
    } else {
      this.modalTitle = "编辑路由";
      setTimeout(() => {
        this.form.setFieldsValue({
          name: record.name,
          groupId: record.groupId,
          route: record.route,
          imitate: String(record.imitate || 0),
          code: record.code,
          id: record.id,
          sort: String(record.sort),
          status: String(record.status || 1)
        });
      }, 0);
    }
  }
  public modalCancel() {
    this.modalVisible = false;
    this.form.resetFields();
  }
  public modalOK() {
    const { getRouteList, modalCancel } = this;
    this.form.validateFields((error: any, values: any) => {
      if (!error) {
        let params = values;
        params["group.id"] = values.groupId;
        delete params.groupId;
        routeSave(params).then(res => {
          if (res.code === 0) {
            this.$notification["success"]({
              message: "提示",
              description: res.msg
            });
            getRouteList();
            modalCancel();
          }
        });
      }
    });
  }
  public formatterSelectList(data: Array<any>, field: any): Array<any> {
    return data.map(v => {
      return {
        label: v.name,
        key: v.id,
        value: v[field]
      };
    });
  }
}
</script>

<style lang="scss" scoped>
.routeManager {
  .routeManager-header {
    margin-bottom: 1rem;
  }
}
</style>