const got = require("got");

const GET_TOKEN_URL = "https://juejin.cn/get/token";
const HEADER = {
    "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67",
};
const START_GAME_URL =
    "https://juejin-game.bytedance.com/game/sea-gold/game/start?";
const LOGIN_GAME_URL =
    "https://juejin-game.bytedance.com/game/sea-gold/user/login?";
const GET_INFO_URL =
    "https://juejin-game.bytedance.com/game/sea-gold/home/info?";
const ROLE_LIST = {
    CLICK: 2,
    YOYO: 1,
    HAWKING: 3,
};

class Game {
    constructor(uid, username, cookie) {
        this.uid = uid;
        this.username = username;
        this.cookie = cookie;
        this.authorization;
    }

    /**
     * @desc 获取authorization授权
     * @returns
     */
    getToken = () => {
        return got.post(GET_TOKEN_URL, {
            hooks: {
                beforeRequest: [
                    (options) => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            cookie: this.cookie,
                        });
                    },
                ],
            },
        });
    };

    /**
     * @desc 获取用户信息
     * @returns
     */
    getInfo = () => {
        const URL =
            GET_INFO_URL + `uid=${this.uid}&time=` + new Date().getTime();
        return got.post(URL, {
            hooks: {
                beforeRequest: [
                    (options) => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            authorization: this.authorization,
                        });
                    },
                ],
            },
        });
    };

    /**
     * @desc 登录游戏
     * @returns
     */
    loginGame = () => {
        const URL =
            LOGIN_GAME_URL + `uid=${this.uid}&time=` + new Date().getTime();
        const body = { name: this.username };
        return got.post(URL, {
            hooks: {
                beforeRequest: [
                    (options) => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            authorization: this.authorization,
                        });
                    },
                ],
            },
            json: body,
        });
    };

    /**
     * @desc 开始游戏
     * @returns
     */
    loginGame = () => {
        const URL =
            START_GAME_URL + `uid=${this.uid}&time=` + new Date().getTime();
        const body = { roleId: ROLE_LIST.CLICK };
        return got.post(URL, {
            hooks: {
                beforeRequest: [
                    (options) => {
                        Object.assign(options.headers, {
                            ...HEADER,
                            authorization: this.authorization,
                        });
                    },
                ],
            },
            json: body,
        });
    };

    /**
     * @desc 移动
     */
    move = () => {}

    /**
     * @desc 结束游戏
     */
    outGame = () => {}


}

export default Game;
