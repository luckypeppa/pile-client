<template>
  <div class="editor">
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
      class="bubble-menu"
    >
      <base-button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        prependIcon="fa-solid fa-bold"
        text
      >
      </base-button>
      <base-button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        prependIcon="fa-solid fa-italic"
        text
      >
      </base-button>
      <base-button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        prependIcon="fa-solid fa-strikethrough"
        text
      >
      </base-button>
    </bubble-menu>
    <div v-if="editor" class="editor-menu">
      <input
        type="file"
        @change="addImage"
        ref="imageInput"
        class="add-image"
      />
      <div class="button-group">
        <base-button
          @click="triggerAddImage"
          text
          prependIcon="fa-solid fa-image"
        ></base-button>
        <base-button
          @click="setLink"
          :class="{ 'is-active': editor.isActive('link') }"
          text
        >
          setLink
        </base-button>
        <base-button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          prependIcon="fa-solid fa-bold"
          text
        >
        </base-button>
        <base-button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          prependIcon="fa-solid fa-italic"
          text
        >
        </base-button>
        <base-button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          prependIcon="fa-solid fa-strikethrough"
          text
        >
        </base-button>
        <base-button
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          prependIcon="fa-solid fa-code"
          text
        >
        </base-button>
        <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
          clear marks
        </button> -->
        <!-- <button @click="editor.chain().focus().clearNodes().run()">
          clear nodes
        </button> -->
        <base-button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          prependIcon="fa-solid fa-paragraph"
          text
        >
        </base-button>
        <basee-button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          text
        >
          h1
        </basee-button>
        <base-button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          text
        >
          h2
        </base-button>
        <base-button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          text
        >
          h3
        </base-button>
        <!-- <button
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
        </button> -->
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
import Link from "@tiptap/extension-link";
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
      extensions: [StarterKit, Image, Link],
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

    // link
    function setLink() {
      const previousUrl = editor.value.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.value.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor.value
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }

    onBeforeUnmount(() => {
      editor.value.destroy();
    });

    return { editor, addImage, triggerAddImage, imageInput, setLink };
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
    border-bottom: 1px solid black;
    padding-bottom: 1rem;

    .add-image {
      display: none;
    }

    .button-group {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 1rem 2rem;
      justify-items: center;

      @media (max-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }

      .is-active {
        color: blue;
      }
    }
  }
}
</style>
