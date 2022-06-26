<template>
  <div class="editor">
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
      class="bubble-menu"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
    </bubble-menu>
    <div v-if="editor" class="editor-menu">
      <input type="file" @change="addImage" ref="imageInput" />
      <div class="button-group">
        <base-button @click="triggerAddImage">ADD IMAGE</base-button>
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          bold
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          italic
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          strike
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          code
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()">
          clear marks
        </button>
        <button @click="editor.chain().focus().clearNodes().run()">
          clear nodes
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          paragraph
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          h1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          h2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          h3
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          h4
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          h5
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          h6
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          bullet list
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          ordered list
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          code block
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          blockquote
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          horizontal rule
        </button>
        <button @click="editor.chain().focus().setHardBreak().run()">
          hard break
        </button>
        <button @click="editor.chain().focus().undo().run()">undo</button>
        <button @click="editor.chain().focus().redo().run()">redo</button>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import postApi from "@/services/post";
import { onBeforeUnmount, watch, ref } from "vue";
export default {
  components: {
    EditorContent,
    BubbleMenu,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const editor = useEditor({
      extensions: [StarterKit, Image],
      content: props.modelValue,
      autofocus: true,
      onUpdate: () => {
        // HTML
        context.emit("update:modelValue", editor.value.getHTML());
        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });

    watch(props, (newValue) => {
      // HTML
      const isSame = editor.value.getHTML() === newValue.modelValue;
      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
      if (isSame) {
        return;
      }
      editor.value.commands.setContent(newValue.modelValue, false);
    });

    // add image
    const imageInput = ref();

    function triggerAddImage() {
      imageInput.value.click();
    }

    function addImage(e) {
      const img = e.target.files[0];
      postApi
        .uploadCover(img)
        .then((res) => {
          const url = process.env.VUE_APP_BASE_URL + res.data.imageUrl;
          editor.value.chain().focus().setImage({ src: url }).run();
        })
        .catch((err) => console.log("err:", err));
    }

    onBeforeUnmount(() => {
      editor.value.destroy();
    });

    return { editor, addImage, triggerAddImage, imageInput };
  },
};
</script>

<style lang="scss" scoped>
.editor {
  border-radius: 0.5rem;
  border: 1px solid black;
  padding: 1rem;
  .bubble-menu {
    display: flex;
    gap: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    background-color: #fff;

    button {
      background-color: #fff;
      font-size: 1.5rem;

      &.is-active {
        color: lightskyblue;
      }
    }
  }

  .editor-menu {
    margin-bottom: 1rem;

    .add-image {
      margin-bottom: 2rem;
    }

    .button-group {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 1rem 2rem;

      @media (max-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }

      button {
        background-color: transparent;
        padding: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        border: 1px solid black;
        border-radius: 0.5rem;

        &.is-active {
          background-color: lightskyblue;
        }
      }
    }
  }
}
</style>
