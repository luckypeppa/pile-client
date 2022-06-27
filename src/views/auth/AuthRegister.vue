<template>
  <form @submit="submit" class="user-form">
    <h2>{{ $t("auth.title.register") }}</h2>
    <BaseInput
      v-model="username"
      :label="$t('auth.username')"
      type="text"
      :error="messages.username"
    />
    <BaseInput
      v-model="email"
      :label="$t('auth.email')"
      type="email"
      :error="messages.email"
    />
    <BaseInput
      v-model="password"
      :label="$t('auth.password')"
      type="password"
      :error="messages.password"
    />
    <p class="error" v-if="error">{{ error }}</p>
    <BaseButton type="submit">{{ $t("auth.buttons.register") }}</BaseButton>
    <router-link :to="{ name: 'login', params: { language: $i18n.locale } }">{{
      $t("auth.buttons.login")
    }}</router-link>
  </form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { object, string, setLocale } from "yup";
import api from "../../services/api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "userRegister",
  setup() {
    const router = useRouter();
    const store = useStore();

    const error = ref("");

    // set error locale key
    setLocale({
      string: {
        email: {
          default: "errors.invalidEmail",
        },
        min: ({ min }) => ({ key: "errors.tooShort", value: { min } }),
        max: ({ max }) => ({ key: "errors.tooLong", value: { max } }),
        required: {
          default: "errors.required",
        },
        matches: ({ matches }) => ({
          key: "errors.matches",
          value: { matches },
        }),
      },
    });

    // set validation schema with yup
    const validationSchema = object({
      email: string().email().required(),
      username: string().min(6).max(12).required(),
      password: string()
        .min(12)
        .required()
        .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, {
          message: "errors.oneSymbol",
        }),
    });

    const { handleSubmit, errors } = useForm({
      validationSchema,
    });
    const { value: email } = useField("email");
    const { value: username } = useField("username");
    const { value: password } = useField("password");

    const submit = handleSubmit((values) => {
      api
        .post(
          process.env.VUE_APP_BASE_URL + "auth/register",
          {
            username: values.username,
            email: values.email,
            password: values.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          store.commit("SET_USER_DATA", res.response.data);
          router.push({ name: "login" });
        })
        .catch((err) => {
          console.log("There is an Error:", err);
          error.value = err.response.data.message;
        });
    });

    // retrieve error locale from i18n
    const { t } = useI18n();

    const messages = computed(() => {
      const msgs = {};
      for (const [key, error] of Object.entries(errors.value)) {
        if (error.key) {
          msgs[key] = t(error.key, error.value || {});
        } else if (error.default) {
          msgs[key] = t(error.default);
        } else {
          msgs[key] = t(error);
        }
      }
      return msgs;
    });

    return {
      submit,
      email,
      username,
      password,
      messages,
      error,
    };
  },
};
</script>

<style lang="scss">
.user-form {
  width: min(90%, 20rem);
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: red;
}
</style>
