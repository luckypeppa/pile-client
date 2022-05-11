<template>
  <form @submit="submit" class="user-form">
    <BaseInput v-model="email" label="Email" type="email" required="true" />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      required="true"
    />
    <button type="submit">Regitser</button>
    <router-link :to="{ name: 'register' }">Register</router-link>
  </form>
</template>

<script>
export default {
  name: "userLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
