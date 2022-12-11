"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
(() => {
    var _UI_instances, _UI_container, _UI_button, _UI_timeInterval, _UI_isLooped, _UI_units, _UI_succeededMsg, _UI_failedMsg, _UI_buttonText, _UI_video, _UI_createElm, _UI_createTimeInput, _Video_instances, _Video_video, _Video_start, _Video_end, _Video_url, _Video_setVideo;
    class UI {
        constructor(obj) {
            _UI_instances.add(this);
            _UI_container.set(this, void 0);
            _UI_button.set(this, void 0);
            _UI_timeInterval.set(this, void 0);
            _UI_isLooped.set(this, void 0);
            _UI_units.set(this, void 0);
            _UI_succeededMsg.set(this, void 0);
            _UI_failedMsg.set(this, void 0);
            _UI_buttonText.set(this, void 0);
            _UI_video.set(this, void 0);
            this.isCreated = false;
            if (location.href.indexOf('https://www.youtube.com/watch') === 0) {
                const root = document.querySelector(obj.root);
                if (root !== null) {
                    __classPrivateFieldSet(this, _UI_container, __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'div', { id: 'extension-toggle-container' }), "f");
                    this.toggle = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'div', { id: 'extension-toggle' });
                    const $name = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'span', { id: 'extension-toggle-name' }, obj.name);
                    __classPrivateFieldSet(this, _UI_button, __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'button', { type: 'checkbox', id: 'extension-toggle-button' }), "f");
                    root.insertBefore(__classPrivateFieldGet(this, _UI_container, "f"), root.children[obj.num - 1]);
                    __classPrivateFieldGet(this, _UI_container, "f").appendChild($name);
                    __classPrivateFieldGet(this, _UI_container, "f").appendChild(this.toggle);
                    this.toggle.appendChild(__classPrivateFieldGet(this, _UI_button, "f"));
                    __classPrivateFieldSet(this, _UI_isLooped, false, "f");
                    this.isCreated = true;
                    this.toggle.addEventListener('click', () => {
                        this.toggleClick();
                    });
                    __classPrivateFieldSet(this, _UI_units, obj.units, "f");
                    __classPrivateFieldSet(this, _UI_succeededMsg, obj.succeededMsg, "f");
                    __classPrivateFieldSet(this, _UI_failedMsg, obj.failedMsg, "f");
                    __classPrivateFieldSet(this, _UI_buttonText, obj.buttonText, "f");
                    __classPrivateFieldSet(this, _UI_video, new Video(), "f");
                }
            }
        }
        toggleClick() {
            if (this.toggle.classList.contains('checked')) {
                this.toggle.classList.remove('checked');
                __classPrivateFieldSet(this, _UI_isLooped, false, "f");
                this.remove(__classPrivateFieldGet(this, _UI_timeInterval, "f"));
            }
            else {
                this.toggle.classList.add('checked');
                __classPrivateFieldGet(this, _UI_video, "f").setTimer({ hour: 0, minute: 0, second: 0 }, { hour: 0, minute: 0, second: 0 });
                __classPrivateFieldSet(this, _UI_isLooped, true, "f");
                __classPrivateFieldGet(this, _UI_instances, "m", _UI_createTimeInput).call(this);
            }
        }
        buttonClick() {
            let clickText = __classPrivateFieldGet(this, _UI_failedMsg, "f");
            const inputs = document.querySelectorAll('.extension-input');
            if (inputs !== null) {
                const start = { hour: Number(inputs[0].value), minute: Number(inputs[1].value), second: Number(inputs[2].value) };
                const end = { hour: Number(inputs[3].value), minute: Number(inputs[4].value), second: Number(inputs[5].value) };
                if (__classPrivateFieldGet(this, _UI_video, "f").setTimer(start, end))
                    clickText = __classPrivateFieldGet(this, _UI_succeededMsg, "f");
            }
            const previousNotice = document.querySelector('#extension-notice');
            if (previousNotice !== null)
                this.remove(previousNotice);
            const notice = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'span', { id: 'extension-notice', style: 'font-size: 14px' }, clickText);
            __classPrivateFieldGet(this, _UI_timeInterval, "f").appendChild(notice);
            sleep(2, this.remove, notice);
        }
        remove(elm = __classPrivateFieldGet(this, _UI_container, "f")) {
            elm.remove();
        }
        loop() {
            if (__classPrivateFieldGet(this, _UI_isLooped, "f"))
                __classPrivateFieldGet(this, _UI_video, "f").loop();
        }
    }
    _UI_container = new WeakMap(), _UI_button = new WeakMap(), _UI_timeInterval = new WeakMap(), _UI_isLooped = new WeakMap(), _UI_units = new WeakMap(), _UI_succeededMsg = new WeakMap(), _UI_failedMsg = new WeakMap(), _UI_buttonText = new WeakMap(), _UI_video = new WeakMap(), _UI_instances = new WeakSet(), _UI_createElm = function _UI_createElm(type, atr = null, content = null) {
        const elm = document.createElement(type);
        if (content !== null)
            elm.textContent = content;
        if (atr !== null) {
            Object.keys(atr).forEach((key) => {
                elm.setAttribute(key, atr[key]);
            });
        }
        return elm;
    }, _UI_createTimeInput = function _UI_createTimeInput() {
        __classPrivateFieldSet(this, _UI_timeInterval, __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'div', { id: 'extension-time-interval' }), "f");
        const inputBoxStart = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'div', { id: 'extension-input-box', class: 'extension-start' });
        const inputBoxEnd = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'div', { id: 'extension-input-box', class: 'extension-end' });
        __classPrivateFieldGet(this, _UI_container, "f").appendChild(__classPrivateFieldGet(this, _UI_timeInterval, "f"));
        __classPrivateFieldGet(this, _UI_timeInterval, "f").appendChild(inputBoxStart);
        __classPrivateFieldGet(this, _UI_timeInterval, "f").appendChild(inputBoxEnd);
        __classPrivateFieldGet(this, _UI_units, "f").forEach(unit => {
            const input = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'input', { type: 'number', class: 'extension-input' });
            const span = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'span', { class: 'extension-unit' }, unit);
            inputBoxStart.appendChild(input);
            inputBoxStart.appendChild(span);
        });
        const $waveDash = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'span', { class: 'extension-wave-dash' }, '～');
        inputBoxStart.appendChild($waveDash);
        __classPrivateFieldGet(this, _UI_units, "f").forEach(unit => {
            const input = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'input', { type: 'number', class: 'extension-input' });
            const span = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'span', { class: 'extension-unit' }, unit);
            inputBoxEnd.appendChild(input);
            inputBoxEnd.appendChild(span);
        });
        const settingButton = __classPrivateFieldGet(this, _UI_instances, "m", _UI_createElm).call(this, 'button', { id: 'extension-button' }, __classPrivateFieldGet(this, _UI_buttonText, "f"));
        __classPrivateFieldGet(this, _UI_timeInterval, "f").appendChild(settingButton);
        settingButton.addEventListener('click', () => {
            this.buttonClick();
        });
    };
    class Video {
        constructor() {
            _Video_instances.add(this);
            _Video_video.set(this, void 0);
            _Video_start.set(this, void 0);
            _Video_end.set(this, void 0);
            _Video_url.set(this, void 0);
            __classPrivateFieldSet(this, _Video_url, location.href, "f");
            __classPrivateFieldGet(this, _Video_instances, "m", _Video_setVideo).call(this, document.querySelector('video'));
            if (__classPrivateFieldGet(this, _Video_video, "f") !== null) {
                __classPrivateFieldSet(this, _Video_start, 0, "f");
                __classPrivateFieldSet(this, _Video_end, __classPrivateFieldGet(this, _Video_video, "f").duration, "f");
            }
        }
        setTimer(start, end) {
            __classPrivateFieldSet(this, _Video_start, start.hour * 3600 + start.minute * 60 + start.second, "f");
            __classPrivateFieldSet(this, _Video_end, end.hour * 3600 + end.minute * 60 + end.second, "f");
            if (__classPrivateFieldGet(this, _Video_video, "f") !== null) {
                if (__classPrivateFieldGet(this, _Video_start, "f") < 0)
                    __classPrivateFieldSet(this, _Video_start, 0, "f");
                if (__classPrivateFieldGet(this, _Video_end, "f") === 0 || __classPrivateFieldGet(this, _Video_end, "f") > __classPrivateFieldGet(this, _Video_video, "f").duration)
                    __classPrivateFieldSet(this, _Video_end, __classPrivateFieldGet(this, _Video_video, "f").duration, "f");
                if (__classPrivateFieldGet(this, _Video_start, "f") >= __classPrivateFieldGet(this, _Video_end, "f")) {
                    __classPrivateFieldSet(this, _Video_start, 0, "f");
                    __classPrivateFieldSet(this, _Video_end, __classPrivateFieldGet(this, _Video_video, "f").duration, "f");
                    return false;
                }
            }
            return true;
        }
        loop() {
            if (__classPrivateFieldGet(this, _Video_url, "f") === location.href) {
                if (__classPrivateFieldGet(this, _Video_video, "f") === null)
                    __classPrivateFieldGet(this, _Video_instances, "m", _Video_setVideo).call(this, document.querySelector('video'));
                if (__classPrivateFieldGet(this, _Video_video, "f") !== null) {
                    const currentVideo = document.querySelector('video');
                    if (currentVideo !== null && __classPrivateFieldGet(this, _Video_video, "f").src !== currentVideo.src) {
                        __classPrivateFieldGet(this, _Video_instances, "m", _Video_setVideo).call(this, currentVideo);
                    }
                    if (__classPrivateFieldGet(this, _Video_video, "f").currentTime < __classPrivateFieldGet(this, _Video_start, "f"))
                        __classPrivateFieldGet(this, _Video_video, "f").currentTime = __classPrivateFieldGet(this, _Video_start, "f");
                    if (__classPrivateFieldGet(this, _Video_video, "f").currentTime >= __classPrivateFieldGet(this, _Video_end, "f")) {
                        __classPrivateFieldGet(this, _Video_video, "f").currentTime = __classPrivateFieldGet(this, _Video_start, "f");
                        sleep(1, () => {
                            if (__classPrivateFieldGet(this, _Video_video, "f") !== null && __classPrivateFieldGet(this, _Video_video, "f").paused)
                                __classPrivateFieldGet(this, _Video_video, "f").play();
                        });
                    }
                    if (isNaN(__classPrivateFieldGet(this, _Video_video, "f").duration) && __classPrivateFieldGet(this, _Video_video, "f").paused) {
                        const replayBtn = document.querySelector('.ytp-play-button.ytp-button');
                        if (replayBtn !== null)
                            replayBtn.click();
                    }
                    if (isNaN(__classPrivateFieldGet(this, _Video_end, "f"))) {
                        const player = document.querySelector('#movie_player');
                        if (player !== null) {
                            const player_children = player.children;
                            for (let i = 0; i < player.children.length; i++) {
                                if (player_children[i].classList.contains('ytp-spinner') && player_children[i].style.display === 'none') {
                                    __classPrivateFieldGet(this, _Video_video, "f").currentTime = __classPrivateFieldGet(this, _Video_start, "f");
                                    __classPrivateFieldSet(this, _Video_end, __classPrivateFieldGet(this, _Video_video, "f").duration, "f");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    _Video_video = new WeakMap(), _Video_start = new WeakMap(), _Video_end = new WeakMap(), _Video_url = new WeakMap(), _Video_instances = new WeakSet(), _Video_setVideo = function _Video_setVideo(video) {
        __classPrivateFieldSet(this, _Video_video, video, "f");
    };
    const sleep = (second, callbackFunc, arg = null) => {
        let elapsedTime = 0;
        const interval = setInterval(() => {
            elapsedTime++;
            if (elapsedTime >= second) {
                clearInterval(interval);
                if (callbackFunc) {
                    if (arg === null)
                        callbackFunc();
                    else
                        callbackFunc(arg);
                }
            }
        }, 1000);
    };
    const main = () => {
        const loopButton = new UI({
            name: 'Loop',
            root: '#above-the-fold.style-scope.ytd-watch-metadata',
            num: 2,
            units: ['h', 'm', 's'],
            succeededMsg: 'Changed Settings!',
            failedMsg: 'Incorrect Settings!',
            buttonText: 'OK!'
        });
        const url = location.href;
        if (loopButton.isCreated) {
            const interval = setInterval(() => {
                loopButton.loop();
                if (url !== location.href) {
                    clearInterval(interval);
                    loopButton.remove();
                    sleep(1, main);
                }
            }, 100);
        }
        else {
            const interval = setInterval(() => {
                if (url !== location.href) {
                    clearInterval(interval);
                    sleep(1, main);
                }
            }, 100);
        }
    };
    if (document.visibilityState === 'visible')
        sleep(1, main);
    else {
        window.addEventListener('focus', () => {
            sleep(1, main);
        }, { once: true });
    }
})();
