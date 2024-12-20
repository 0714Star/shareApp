package com.jxufe_yzt.java.utils.generate;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;

import java.io.File;
import java.util.List;

import static com.jxufe_yzt.java.utils.generate.CodeGenerator.*;

/**
 * Vue代码生成器
 */
public class VueGenerator {

    /**
     * 生成 代码
     *
     * @param tableName 表名
     */
    public static void generate(String tableName) {
        Table table = getTableColumns(tableName);
        String entityClassName = getEntityClassName(tableName);
        String entityName = getEntityName(tableName);
        StringBuilder builder = StrUtil.builder()
                .append("<template>\n" +
                        "  <div>\n" +
                        "    <div class=\"search\">\n" +
                        "      <el-input placeholder=\"请输入关键字查询\" style=\"width: 200px\" v-model=\"username\"></el-input>\n" +
                        "      <el-button type=\"info\" plain style=\"margin-left: 10px\" @click=\"load(1)\">查询</el-button>\n" +
                        "      <el-button type=\"warning\" plain style=\"margin-left: 10px\" @click=\"reset\">重置</el-button>\n" +
                        "    </div>\n" +
                        "\n" +
                        "    <div class=\"operation\">\n" +
                        "      <el-button type=\"primary\" plain @click=\"handleAdd\">新增</el-button>\n" +
                        "      <el-button type=\"danger\" plain @click=\"delBatch\">批量删除</el-button>\n" +
                        "    </div>\n" +
                        "\n" +
                        "    <div class=\"table\">\n" +
                        "      <el-table :data=\"tableData\" strip @selection-change=\"handleSelectionChange\">\n" +
                        "        <el-table-column type=\"selection\" width=\"55\" align=\"center\"></el-table-column>\n" +
                        "        <el-table-column prop=\"id\" label=\"序号\" width=\"70\" align=\"center\" sortable></el-table-column>\n");

        List<TableColumn> tableColumns = table.getTableColumns();
        for (TableColumn tableColumn : tableColumns) {
            String camelName = StrUtil.toCamelCase(tableColumn.getName());
            if ("id".equals(tableColumn.getName())) {
                continue;
            }
            builder.append("        <el-table-column prop=\"").append(camelName).append("\" label=\"").append(tableColumn.getComment()).append("\"></el-table-column>\n");
        }
        builder.append("        <el-table-column label=\"操作\" align=\"center\" width=\"180\">\n" +
                "          <template v-slot=\"scope\">\n" +
                "            <el-button size=\"mini\" type=\"primary\" plain @click=\"handleEdit(scope.row)\">编辑</el-button>\n" +
                "            <el-button size=\"mini\" type=\"danger\" plain @click=\"del(scope.row.id)\">删除</el-button>\n" +
                "          </template>\n" +
                "        </el-table-column>\n" +
                "      </el-table>\n\n" +
                "      <div class=\"pagination\">\n" +
                "        <el-pagination\n" +
                "            background\n" +
                "            @current-change=\"handleCurrentChange\"\n" +
                "            :current-page=\"pageNum\"\n" +
                "            :page-sizes=\"[5, 10, 20]\"\n" +
                "            :page-size=\"pageSize\"\n" +
                "            layout=\"total, prev, pager, next\"\n" +
                "            :total=\"total\">\n" +
                "        </el-pagination>\n" +
                "      </div>\n" +
                "    </div>\n\n");
        builder.append("    <el-dialog title=\"" + table.getTableComment() + "\" :visible.sync=\"fromVisible\" width=\"40%\" :close-on-click-modal=\"false\" destroy-on-close>\n" +
                "      <el-form :model=\"form\" label-width=\"100px\" style=\"padding-right: 50px\" :rules=\"rules\" ref=\"formRef\">\n");
        for (TableColumn tableColumn : tableColumns) {
            if ("id".equals(tableColumn.getName())) {
                continue;
            }
            String camelName = StrUtil.toCamelCase(tableColumn.getName());
            builder.append("        <el-form-item label=\"" + tableColumn.getComment() + "\" prop=\"" + camelName + "\">\n" +
                    "          <el-input v-model=\"form." + camelName + "\" placeholder=\"" + tableColumn.getComment() + "\"></el-input>\n" +
                    "        </el-form-item>\n");
        }
        builder.append("      </el-form>\n" +
                "      <div slot=\"footer\" class=\"dialog-footer\">\n" +
                "        <el-button @click=\"fromVisible = false\">取 消</el-button>\n" +
                "        <el-button type=\"primary\" @click=\"save\">确 定</el-button>\n" +
                "      </div>\n" +
                "    </el-dialog>\n" +
                "\n" +
                "\n" +
                "  </div>\n" +
                "</template>" +
                "\n" +
                "<script>\n" +
                "export default {\n" +
                "  name: \"" + entityClassName + "\",\n" +
                "  data() {\n" +
                "    return {\n" +
                "      tableData: [],  // 所有的数据\n" +
                "      pageNum: 1,   // 当前的页码\n" +
                "      pageSize: 10,  // 每页显示的个数\n" +
                "      total: 0,\n" +
                "      username: null,\n" +
                "      fromVisible: false,\n" +
                "      form: {},\n" +
                "      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),\n" +
                "      rules: {\n" +
                "      },\n" +
                "      ids: []\n" +
                "    }\n" +
                "  },\n" +
                "  created() {\n" +
                "    this.load(1)\n" +
                "  },\n" +
                "  methods: {\n" +
                "    handleAdd() {   // 新增数据\n" +
                "      this.form = {}  // 新增数据的时候清空数据\n" +
                "      this.fromVisible = true   // 打开弹窗\n" +
                "    },\n" +
                "    handleEdit(row) {   // 编辑数据\n" +
                "      this.form = JSON.parse(JSON.stringify(row))  // 给form对象赋值  注意要深拷贝数据\n" +
                "      this.fromVisible = true   // 打开弹窗\n" +
                "    },\n" +
                "    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新\n" +
                "      this.$refs.formRef.validate((valid) => {\n" +
                "        if (valid) {\n" +
                "          this.$request({\n" +
                "            url: this.form.id ? '/" + entityName + "/update' : '/" + entityName + "/add',\n" +
                "            method: this.form.id ? 'PUT' : 'POST',\n" +
                "            data: this.form\n" +
                "          }).then(res => {\n" +
                "            if (res.code === '200') {  // 表示成功保存\n" +
                "              this.$message.success('保存成功')\n" +
                "              this.load(1)\n" +
                "              this.fromVisible = false\n" +
                "            } else {\n" +
                "              this.$message.error(res.msg)  // 弹出错误的信息\n" +
                "            }\n" +
                "          })\n" +
                "        }\n" +
                "      })\n" +
                "    },\n" +
                "    del(id) {   // 单个删除\n" +
                "      this.$confirm('您确定删除吗？', '确认删除', {type: \"warning\"}).then(response => {\n" +
                "        this.$request.delete('/" + entityName + "/delete/' + id).then(res => {\n" +
                "          if (res.code === '200') {   // 表示操作成功\n" +
                "            this.$message.success('操作成功')\n" +
                "            this.load(1)\n" +
                "          } else {\n" +
                "            this.$message.error(res.msg)  // 弹出错误的信息\n" +
                "          }\n" +
                "        })\n" +
                "      }).catch(() => {\n" +
                "      })\n" +
                "    },\n" +
                "    handleSelectionChange(rows) {   // 当前选中的所有的行数据\n" +
                "      this.ids = rows.map(v => v.id)\n" +
                "    },\n" +
                "    delBatch() {   // 批量删除\n" +
                "      if (!this.ids.length) {\n" +
                "        this.$message.warning('请选择数据')\n" +
                "        return\n" +
                "      }\n" +
                "      this.$confirm('您确定批量删除这些数据吗？', '确认删除', {type: \"warning\"}).then(response => {\n" +
                "        this.$request.delete('/" + entityName + "/delete/batch', {data: this.ids}).then(res => {\n" +
                "          if (res.code === '200') {   // 表示操作成功\n" +
                "            this.$message.success('操作成功')\n" +
                "            this.load(1)\n" +
                "          } else {\n" +
                "            this.$message.error(res.msg)  // 弹出错误的信息\n" +
                "          }\n" +
                "        })\n" +
                "      }).catch(() => {\n" +
                "      })\n" +
                "    },\n" +
                "    load(pageNum) {  // 分页查询\n" +
                "      if (pageNum) this.pageNum = pageNum\n" +
                "      this.$request.get('/" + entityName + "/selectPage', {\n" +
                "        params: {\n" +
                "          pageNum: this.pageNum,\n" +
                "          pageSize: this.pageSize,\n" +
                "          username: this.username,\n" +
                "        }\n" +
                "      }).then(res => {\n" +
                "        this.tableData = res.data?.list\n" +
                "        this.total = res.data?.total\n" +
                "      })\n" +
                "    },\n" +
                "    reset() {\n" +
                "      this.username = null\n" +
                "      this.load(1)\n" +
                "    },\n" +
                "    handleCurrentChange(pageNum) {\n" +
                "      this.load(pageNum)\n" +
                "    },\n" +
                "  }\n" +
                "}\n" +
                "</script>\n" +
                "\n" +
                "<style scoped>\n" +
                "\n" +
                "</style>"
        );

        // 把字符串写出到文件
        FileUtil.writeString(builder.toString(), vueFilePath + File.separator + entityClassName + ".vue", "UTF-8");
        System.out.println(entityClassName + ".vue 生成成功");
    }

}
