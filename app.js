const got = require('got')

const { cookie, aid, uuid, _signature, PUSH_PLUS_TOKEN } = require('./config')

const BASEURL = 'https://api.juejin.cn/growth_api/v1/check_in' // 掘金签到api
const PUSH_URL = 'http://www.pushplus.plus/send' // pushplus 推送api

const URL = `${BASEURL}?aid=${aid}&uuid=${uuid}&_signature=${_signature}`

const HEADERS = {
  cookie,
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67'
}

// 签到
async function signIn () {
  const res = await got.post(URL, {
    hooks: {
      beforeRequest: [
        options => {
          Object.assign(options.headers, HEADERS)
        }
      ]
    }
  })
  console.log(res.body)
  handlePush(res.body)
}

// push
async function handlePush (desp) {
  const body = {
    token: `${PUSH_PLUS_TOKEN}`,
    title: `签到结果`,
    content: `${desp}`
  };
  const res = await got.post(PUSH_URL, {
    json: body
  })
  console.log(res.body)
}

signIn()

