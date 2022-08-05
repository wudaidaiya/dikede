<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <img
        src="http://likede2-admin.itheima.net/img/logo.595745bd.png"
        alt=""
        class="login-logo"
      />
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-mobile-phone" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.loginName"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="code" class="form_code">
        <div class="code_left">
          <span class="svg-container">
            <svg-icon icon-class="auth" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.code"
            placeholder="请输入验证码"
            name="code"
            tabindex="3"
            auto-complete="on"
          />
          <div class="code_right" @click="changeImageCode">
            <img src="" alt="" ref='img' />
          </div>
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getImageCode } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginName: "admin",
        password: "admin",
        code: "",
        clientToken: "",
        loginType: 0,
      },
      loginRules: {
        loginName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{4}$/,
            message: "验证码不规范",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  created() {
    this.getNum();
    this.getImageCode();
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    // 点击验证码切换
    changeImageCode() {
      this.getNum();
      this.getImageCode();
    },
    // 获取验证码
    async getImageCode() {
      const res = await getImageCode(this.loginForm.clientToken);
      this.$refs.img.src=res.request.responseURL
    },
    // 生成随机数
    getNum() {
      const chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      let num = "";
      for (let i = 0; i < 32; i++) {
        let id = parseInt(Math.random() * 61);
        num += chars[id];
      }
      this.loginForm.clientToken = num;
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录
    async login() {
      try {
        this.loading = true;
        await this.$refs.loginForm.validate();
        this.$store.dispatch("user/getToken", this.loginForm);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.el-input__inner {
  color: #999 !important;
}
.el-form-item__content {
  background-color: #fff;
  border: 1px solid #e3e3e3;
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: #999;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.code_right {
  img {
    width: 130px;
    height: 50px;
  }
}
::v-deep .el-form-item__content {
  height: 50px;
}
.login-container .el-form-item {
  border: unset;
}
.code_left {
  display: flex;
}
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background: url("../../assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    left: 50%;
    top: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    background-color: #fff;
    .login-logo {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
      border-style: none;
    }
  }
  .el-button--primary {
    width: 100%;
    height: 52px;
    background: linear-gradient(
      262deg,
      hsl(229deg 75% 53%),
      hsl(233deg 82% 67%)
    );
    opacity: 0.91;
    border-radius: 8px;
    color: hsl(0deg 0% 100%);
    text-shadow: 0 7px 22px #cfcfcf;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    font-size: 16px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
