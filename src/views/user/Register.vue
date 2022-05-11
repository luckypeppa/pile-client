<template>
  <form @submit="submit" class="user-form">
    <BaseInput
      v-model="email"
      label="Email"
      type="email"
      :error="errors.email"
    />
    <BaseInput
      v-model="username"
      label="Username"
      type="text"
      :error="errors.username"
    />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      :error="errors.password"
    />
    <button type="submit">Login</button>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";

export default {
  name: "userRegister",
  setup() {
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

    const submit = handleSubmit(() => {
      console.log("submitted");
    });

    return {
      submit,
      email,
      username,
      password,
      errors,
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
</style>
