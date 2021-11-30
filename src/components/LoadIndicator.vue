<template>
  <div class="loader">
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" class="icon__img_b">
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h40v40H0z"></path>
        <circle cx="10" cy="20" r="3.3" fill="currentColor">
          <animate attributeName="r" begin="0s" calcMode="linear" dur="1.2s"
            from="3.3" repeatCount="indefinite" to="3.3" values="3.3;1;3.3;3.3;3.3;3.3;"></animate>
          <animate attributeName="fill-opacity" begin="0s" calcMode="linear"
            dur="1.2s" from="1" repeatCount="indefinite" to="1" values="1;.3;1;1;1;1;1"></animate>
        </circle>
        <circle cx="20" cy="20" r="3.3" fill="currentColor">
          <animate attributeName="r" begin="0s" calcMode="linear" dur="1.2s"
            from="3.3" repeatCount="indefinite" to="3.3" values="3.3;3.3;1;3.3;3.3;3.3;3.3"></animate>
          <animate attributeName="fill-opacity" begin="0s" calcMode="linear"
            dur="1.2s" from=".5" repeatCount="indefinite" to=".5" values="1;1;.3;1;1;1;1"></animate>
        </circle>
        <circle cx="30" cy="20" r="3.3" fill="currentColor">
          <animate attributeName="r" begin="0s" calcMode="linear" dur="1.2s"
            from="3.3" repeatCount="indefinite" to="3.3" values="3.3;3.3;3.3;1;3.3;3.3;3.3"></animate>
          <animate attributeName="fill-opacity" begin="0s" calcMode="linear"
            dur="1.2s" from="1" repeatCount="indefinite" to="1" values="1;1;1;.3;1;1;1"></animate>
        </circle>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LoadIndicator',
}
</script>

<style scoped>
  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1em 2em;
    background-color: rgba(223, 223, 223, 0.8);
    border: 1px solid rgb(194, 194, 194);
    border-radius: 12px;
  }

  .icon__img_b {
    vertical-align: top;
  }
</style>