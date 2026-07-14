<script setup lang="ts">
import { defineProps } from 'vue'
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { slugify } from '@mdit-vue/shared'
import { NavLink } from './types'

const props = defineProps<{
  noIcon?: boolean
  icon?: NavLink['icon']
  badge?: NavLink['badge']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

const formatTitle = computed(() => {
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
})

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' }
  }
  return props.badge

})

</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <template v-if="!noIcon">
        <div v-if="svg" class="icon" v-html="svg"></div>
        <div v-else-if="icon && typeof icon === 'string'" class="icon">
          <img :src="withBase(icon)" :alt="title" onerror="this.parentElement.style.display='none'" />
        </div>
      </template>
      <div class="content">
        <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">
          {{ title }}
        </h5>
        <p v-if="desc" class="desc">{{ desc }}</p>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
    </article>
  </a>
</template>

<style lang="scss" scoped>
.m-nav-link {
  --m-nav-icon-box-size: 45px;
  --m-nav-icon-size: 45px;
  --m-nav-box-gap: 8px;

  display: block;
  border-radius: 8px;
  height: 100%;
  text-decoration: inherit;
  transition: all 0.25s;
  align-items: center;

  .box {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: flex-start;
    padding: var(--m-nav-box-gap);
    height: 100%;
    color: var(--vp-c-text-1);

    &.has-badge {
      padding-top: calc(var(--m-nav-box-gap) + 2px);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    min-width: 0;
    padding: 5px 0;
    ;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 8px;
    min-width: var(--m-nav-icon-box-size);
    height: var(--m-nav-icon-box-size);
    font-size: var(--m-nav-icon-size);
    background-color: var(--vp-c-bg-soft-down);
    transition: background-color 0.25s;
    touch-action: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;

    :deep(svg) {
      width: var(--m-nav-icon-size);
      fill: currentColor;
      pointer-events: none;
    }

    :deep(img) {
      border-radius: 8px;
      width: var(--m-nav-icon-size);
      pointer-events: none;
      -webkit-user-drag: none;
    }
  }

  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 2px;
    line-height: 1.2;
    max-height: 18px;
  }

  .badge {
    position: absolute;
    top: 2.2px;
    right: 0;
    transform: scale(0.9);
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    line-height: 1.2;
    font-size: 13px;
    margin: 6px 0 6px;
    max-height: 31px;
    color: var(--vp-c-text-2);
  }
}

@media (max-width: 1200px) {
  .m-nav-links {
    grid-template-columns: repeat(4, 1fr);
  }

  .m-nav-link {
    --m-nav-icon-box-size: 42px;
    --m-nav-icon-size: 42px;

    .badge {
      transform: scale(0.85);
    }
  }
}

@media (max-width: 960px) {
  .m-nav-links {
    grid-template-columns: repeat(3, 1fr);
    --m-nav-gap: 12px;
  }

  .m-nav-link {
    --m-nav-icon-box-size: 38px;
    --m-nav-icon-size: 38px;

    .title {
      font-size: 14px;
    }

    .desc {
      font-size: 12px;
    }

    .badge {
      transform: scale(0.8);
      top: 2px;
    }
  }
}

@media (max-width: 768px) {
  .m-nav-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .m-nav-link {
    --m-nav-icon-box-size: 35px;
    --m-nav-icon-size: 35px;

    .title {
      font-size: 13px;
    }

    .desc {
      font-size: 11px;
      margin: 4px 0;
    }

    .badge {
      transform: scale(0.75);
      top: 1.8px;
      right: 0;
    }
  }
}

@media (max-width: 480px) {
  .m-nav-links {
    grid-template-columns: repeat(1, 1fr);
  }

  .m-nav-link {
    --m-nav-icon-box-size: 30px;
    --m-nav-icon-size: 30px;

    .title {
      font-size: 12px;
    }

    .desc {
      font-size: 10px;
      margin: 3px 0;
    }

    .badge {
      transform: scale(0.7);
      top: 1.5px;
      right: 0;
    }
  }
}
</style>