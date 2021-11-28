<script>
  export default {
    name: 'Column',
    props: {
      field: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: ''
      },
    },
  };
</script>
