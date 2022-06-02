<script setup lang="ts">
import { useRoute } from 'vue-router';
// import SSOApi from '@/api/sso';

const client_id = '1528437e-c51a-480d-8c94-e733def56ec1';
// const secretKey = '41b1XBD6uR2R5hshNL6V5zwt';
const redirect_uri = 'http://127.0.0.1:3000/authorization';
// const redirect_uri = 'http://localhost:3000/authorizaion';

const code = useRoute().query.ticket;

function getAuth() {
  if (code) {
    console.log('认证成功');
    return;
  }
  // SSOApi.getAuthCode({ client_id, redirect_uri }).then((res) => {
  //   console.log(res);
  // });
  window.location.href = `http://oa.handa.com.cn/sso/oauth2.0/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
}
getAuth();

</script>
