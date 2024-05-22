<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}`">
    <label class="label has-text-white" v-if="label">Some Text</label>
    <div class="field">
      <div class="control">
        <textarea class="textarea" :placeholder="placeholder" :value="modelValue" :maxLength="maxLength" v-autofocus
          @input="emitHandler($event.target.value)" ref="textAreaRef" />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <label v-if="modelValue.length === maxLength" class="label mt-1"
        style="color: red; margin-right: auto; margin-left: 15px;">You already typed {{ maxLength
        }}
        characters</label>
      <div v-else class="characters-length">{{ modelValue.length }} characters</div>
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';
import vAutofocus from '@/directives/vAutofocus.js';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  noteContent: {
    type: String,
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Type Some Text'
  },
  label: {
    type: String,
  },
  maxLength: {
    type: Number,
  }
});

const emit = defineEmits(['update:modelValue']);
const textAreaRef = ref(null);

const emitHandler = (newVal) => {
  emit('update:modelValue', newVal);
};

const focusTextArea = () => {
  textAreaRef.value.focus();
};

defineExpose({
  focusTextArea
});

</script>

<style scoped>
.has-background-success {
  background-color: #0d4b12;
}

.card-footer-item:hover {
  background-color: #f5f5f5;
}

.characters-length {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: auto;
  color: white;
}
</style>