<template>
  <div class="groupManager">
    <div class="groupManager-header">
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
        <a-form-item label="分组名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="[
          'name',
          {rules: [{ required: true, message: '请填写分组名称!' },{whitespace:true, message: '名称不能为空格!' }]}
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
        <a-form-item label="启用状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
          <a-radio-group v-decorator="['status', { initialValue: '1' }]">
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
import { groupSave, groupList, groupDelete } from "@/request/admin";

@Component({})
export default class GroupManager extends Vue {
  private columns: Array<any> = [
    {
      title: "序号",
      key: "sort",
      dataIndex: "sort"
    },
    {
      title: "分组名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      scopedSlots: { customRender: "status" }
    },
    {
      title: "操作",
      key: "action",
      scopedSlots: { customRender: "action" }
    }
  ];
  private dataSource: Array<any> = [];
  private modalVisible: boolean = false;
  public form: any;
  private modalTitle: String = "新增分组";
  private pagination: any = {};

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }
  private mounted() {
    this.$nextTick(() => {
      this.getGroupList();
    });
  }
  public getGroupList(params = { page: 1, limit: 20 }) {
    groupList(params).then(res => {
      if (res.code == 0) {
        this.dataSource = res.data.list;
      }
    });
  }
  public onTableChange(pagination: any, filters: any, sorter: any) {
    const pager = { ...this.pagination };
    pager.current = pagination.current;
    this.pagination = pager;
    this.getGroupList({
      page: pager.current,
      limit: pager.pageSize
    });
  }
  public onDelete(id: number) {
    const { getGroupList } = this;
    groupDelete({ id }).then(res => {
      if (res.code == 0) {
        this.$notification["success"]({
          message: "提示",
          description: res.msg
        });
        getGroupList();
      }
    });
  }
  public edit(num: number, record: any) {
    this.modalVisible = true;
    if (num == 1) {
      this.modalTitle = "新增分组";
    } else {
      this.modalTitle = "编辑分组";
      setTimeout(() => {
        this.form.setFieldsValue({
          name: record.name,
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
    const { getGroupList, modalCancel } = this;
    this.form.validateFields((error: any, values: any) => {
      if (!error) {
        let params = values;
        groupSave(params).then(res => {
          if (res.code === 0) {
            this.$notification["success"]({
              message: "提示",
              description: res.msg
            });
            getGroupList();
            modalCancel();
          }
        });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.groupManager {
  .groupManager-header {
    margin-bottom: 1rem;
  }
}
</style>