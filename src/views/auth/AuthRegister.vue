<template>
  <form @submit="submit" class="user-form">
    <h2>REGISTER</h2>
    <BaseInput
      v-model="username"
      label="Username"
      type="text"
      :error="errors.username"
    />
    <BaseInput
      v-model="email"
      label="Email"
      type="email"
      :error="errors.email"
    />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      :error="errors.password"
    />
    <p class="error" v-if="error">{{ error }}</p>
    <BaseButton type="submit">Register</BaseButton>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";
import api from "../../services/api";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "userRegister",
  setup() {
    const router = useRouter();

    const error = ref("");

    const validationSchema = object({
      email: string().email().required(),
      username: string().max(12).required(),
      password: string()
        .min(12)
        .required()
        .matches(
          /^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/,
          "Password must at least have one special character."
        ),
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
          process.env.VUE_APP_USER_REGISTER_URL,
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
          if (res.status === 201) {
            router.push({ name: "login" });
          }
        })
        .catch((err) => {
          console.log("There is an Error:", err);
          error.value = err.response.data.message;
        });
    });
    return {
      submit,
      email,
      username,
      password,
      errors,
      error,
    };
  },
};
</script>

<style lang="scss">
.user-form {
  width: min(90%, 10rem);
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: red;
}
</style>
