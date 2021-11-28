<script>
  export default {
    name: 'TableStructure',
    props: {
      rows: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      renderHead(h, columnsOptions) {
        return columnsOptions.map((column) => {
          const renderedLabel = column.scopedSlots.label
            ? column.scopedSlots.label()
            : column.label;
          return h(
            'th',
            { class: { 'thead-cell': true }, },
            [renderedLabel],
          );
        });
      },
      renderRows(h, columnsOptions) {
        return this.rows.map((row, index) => {
          return h(
            'tr',
            {
              class: {'tbody-row': true},
              attrs: { key: row._id || index },
            },
            this.renderColumns(h, row, columnsOptions),
          );
        });
      },
      renderColumns(h, row, columnsOptions) {
        return columnsOptions.map((column) => {
          return h(
            'td',
            { class: { 'tbody-cell': true }, },
            column.scopedSlots.data
              ? column.scopedSlots.data(row)
              : row[column.field],
          );
        });
      },
      getColumnOptions() {
        return this.$slots.default
          .filter(item =>
            item.componentOptions && item.componentOptions.tag === 'Column'
          )
          .map(column =>
            Object.assign({}, column.componentOptions.propsData, {
                scopedSlots: column.data.scopedSlots || {}
              }
            )
          );
      }
    },
    render(h) {
      const columnsOptions = this.getColumnOptions();
      const columnsHead = this.renderHead(h, columnsOptions);
      const rows = this.renderRows(h, columnsOptions);
      return h(
        'table',
        { class: { table: true } },
        [h('thead', [h('tr', {class: {'thead-row': true}}, columnsHead)]), h('tbody', rows)],
      );
    }
  };
</script>

<style scoped>
</style>
