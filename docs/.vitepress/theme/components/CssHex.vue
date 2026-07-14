    <template>
      <div :class="$style.myClass">Hello, world!</div>
    </template>

    <script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
      // 使用CSS模块
    })
    </script>

    <style module lang="scss">
    .myClass {
      color: red;
    }
    </style>