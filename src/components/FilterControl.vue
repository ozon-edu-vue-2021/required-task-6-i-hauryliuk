<template>
  <div class="filter">
    <button class="filter-btn" @click="filterClickHandler">
      <svg class="icon" :class="{'icon_active': isFieldActive}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
      </svg>
    </button>
    <div v-show="isFieldActive" class="filter__input-box">
      <input class="filter__input" type="text" :size="inputSize" ref="input" @input="inputHandler" spellcheck="false">
    </div>
  </div>
</template>

<script>
import { debounce } from '@/helpers/debounce.js';

export default {
  name: 'FilterControl',
  props: {
    field: {
      type: String,
      required: true,
    },
  },
  inject: ['filterOptions'],
  data() {
    return {
      inputSize: 5,
    };
  },
  computed: {
    isFieldActive() {
      return this.field === this.filterOptions.field;
    }
  },
  methods: {
    inputHandler(event) {
      const value = event.target.value;
      if (
        (this.inputSize < value.length) ||
        (this.inputSize - value.length > 0 && this.inputSize > 5)
      ) {
        this.inputSize = value.length;
      }
      this.debouncedInputEmit(this, 'filter-term', value);
    },
    filterClickHandler() {
      if (!this.isFieldActive) {
        this.$emit('filtering-initiated', this.field);
      } else {
        this.$emit('filtering-canceled');
      }
    },
    debouncedInputEmit: debounce((instance, event, value) =>
      instance.$emit(event, value), 600),
  },
  updated() {
    if (this.isFieldActive) {
      this.$refs.input.focus();
    } else {
      this.$refs.input.value = '';
      this.inputSize = 5;
    }
  }
};
</script>

<style scoped>
.filter {
  position: absolute;
  top: 50%;
  right: 1em;
  width: 1em;
  height: 1em;
  transform: translateY(-50%);
}

.filter-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  color: inherit;
  opacity: 0.4;
}

.icon_active {
  opacity: 1;
}

.filter__input-box {
  position: absolute;
  top: 0;
  left: 50%;
  width: auto;
  min-width: 300%;
  padding: 0.1em 0.3em 0.2em;
  border-radius: 6px;
  transform: translate(-50%, -100%);
  background-color: #ffffff;
  box-shadow: 0 0 8px -1px #cccccc;
  text-align: left;
}

.thead-cell:first-child .filter__input-box {
  left: 0;
  transform: translate(0, -100%);
}

.thead-cell:last-child .filter__input-box {
  left: auto;
  right: 0;
  transform: translate(0, -100%);
}

.filter__input {
  min-width: 100%;
  padding: 0 0.2em;
  font-size: 0.8em;
  border: none;
  border-bottom: 1px solid #b9b9b9;
  background-color: transparent;
  outline: none;
}

</style>