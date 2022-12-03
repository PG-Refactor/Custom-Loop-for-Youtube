(() => {
    interface UIInfo {
        name: string,
        root: string,
        num: number,
        units: Array<string>,
        succeededMsg: string,
        failedMsg: string,
        buttonText: string
    }

    interface Time {
        hour: number,
        minute: number,
        second: number
    }

    class UI {
        isCreated: boolean;
        toggle: HTMLElement;

        #container: HTMLElement;
        #button: HTMLElement;
        #timeInterval: HTMLElement;
        #isLooped: boolean;
        #units: Array<string>;
        #succeededMsg: string;
        #failedMsg: string;
        #buttonText: string;
        #video: Video;

        constructor(obj: UIInfo) {
            this.isCreated = false;
            if (location.href.indexOf('https://www.youtube.com/watch') === 0) {
                const root = document.querySelector<HTMLElement>(obj.root);
                if (root !== null) {
                    this.#container = this.#createElm('div', {id: 'extension-toggle-container'});
                    this.toggle = this.#createElm('div', {id: 'extension-toggle'});
                    const $name = this.#createElm('span', {id: 'extension-toggle-name'}, obj.name);
                    this.#button = this.#createElm('button', {type: 'checkbox', id: 'extension-toggle-button'})

                    root.insertBefore(this.#container, root.children[obj.num - 1]);
                    this.#container.appendChild($name);
                    this.#container.appendChild(this.toggle);
                    this.toggle.appendChild(this.#button);
                    this.#isLooped = false;
                    this.isCreated = true;

                    this.toggle.addEventListener('click', () => {
                        this.toggleClick();
                    });

                    this.#units = obj.units;
                    this.#succeededMsg = obj.succeededMsg;
                    this.#failedMsg = obj.failedMsg;
                    this.#buttonText = obj.buttonText;
                    this.#video = new Video();
                }
            }
        }

        toggleClick() {
            if (this.toggle.classList.contains('checked')) {
                this.toggle.classList.remove('checked');
                this.#isLooped = false;
                this.remove(this.#timeInterval);
            }
            else {
                this.toggle.classList.add('checked');
                this.#video.setTimer({hour: 0, minute: 0, second: 0}, {hour: 0, minute:0, second: 0});
                this.#isLooped = true;
                this.#createTimeInput();
            }
        }

        buttonClick() {
            let clickText = this.#failedMsg;
            const inputs = document.querySelectorAll<HTMLInputElement>('.extension-input');
            if (inputs !== null) {
                const start = {hour: Number(inputs[0].value), minute: Number(inputs[1].value),second: Number(inputs[2].value)};
                const end = {hour: Number(inputs[3].value), minute: Number(inputs[4].value),second: Number(inputs[5].value)};
                if (this.#video.setTimer(start, end))
                    clickText = this.#succeededMsg;
            }

            const previousNotice = document.querySelector<HTMLElement>('#extension-notice');
            if (previousNotice !== null)
                this.remove(previousNotice);
            const notice = this.#createElm('span', {id: 'extension-notice', style: 'font-size: 14px'}, clickText);
            this.#timeInterval.appendChild(notice);
            sleep(2, this.remove, notice);
        }

        remove(elm=this.#container) {
            elm.remove();
        }

        #createElm(type: string, atr: object | null = null, content: string | null = null) {
            const elm = document.createElement(type);
            if (content !== null)
                elm.textContent = content;
            if (atr !== null) {
                Object.keys(atr).forEach((key) => {
                    elm.setAttribute(key, atr[key as keyof typeof atr]);
                });
            }

            return elm;
        }

        loop() {
            if (this.#isLooped)
                this.#video.loop();
        }

        #createTimeInput() {
            this.#timeInterval = this.#createElm('div', {id: 'extension-time-interval'}); 
            const inputBoxStart = this.#createElm('div', {id: 'extension-input-box', class: 'extension-start'});
            const inputBoxEnd = this.#createElm('div', {id: 'extension-input-box', class: 'extension-end'}); 
            
            this.#container.appendChild(this.#timeInterval);
            this.#timeInterval.appendChild(inputBoxStart);
            this.#timeInterval.appendChild(inputBoxEnd);

            this.#units.forEach(unit => {
                const input = this.#createElm('input', {type: 'number', class: 'extension-input'});
                const span = this.#createElm('span', {class: 'extension-unit'}, unit);
                inputBoxStart.appendChild(input);
                inputBoxStart.appendChild(span);
            });

            const $waveDash = this.#createElm('span', {class: 'extension-wave-dash'}, '～');
            inputBoxStart.appendChild($waveDash);

            this.#units.forEach(unit => {
                const input = this.#createElm('input', {type: 'number', class: 'extension-input'});
                const span = this.#createElm('span', {class: 'extension-unit'}, unit);
                inputBoxEnd.appendChild(input);
                inputBoxEnd.appendChild(span);
            });

            const settingButton = this.#createElm('button', {id: 'extension-button'}, this.#buttonText);
            this.#timeInterval.appendChild(settingButton);

            settingButton.addEventListener('click', () => {
                this.buttonClick();
            });
        }
    }

    class Video {
        #video: HTMLVideoElement | null;
        #start: number;
        #end: number;
        #url: string;

        constructor() {
            this.#url = location.href;
            this.#setVideo(document.querySelector<HTMLVideoElement>('video'));
            if (this.#video !== null) {
                this.#start = 0;
                this.#end = this.#video.duration;
            }
        }

        setTimer(start: Time, end: Time) {
            this.#start = start.hour * 3600 + start.minute * 60 + start.second;
            this.#end = end.hour * 3600 + end.minute * 60 + end.second;
            
            if (this.#video !== null) {
                if (this.#start < 0)
                    this.#start = 0;
                if (this.#end === 0 || this.#end > this.#video.duration)
                    this.#end = this.#video.duration;
                if (this.#start >= this.#end) {
                    this.#start = 0;
                    this.#end = this.#video.duration;
                    return false;
                }
            }
            
            return true;
        }

        loop() {
            if (this.#url === location.href) {
                if (this.#video === null) {
                    this.#setVideo(document.querySelector<HTMLVideoElement>('video'));
                }

                if (this.#video !== null) {
                    const currentVideo = document.querySelector<HTMLVideoElement>('video');
                    if (currentVideo !== null && this.#video.src !== currentVideo.src) {
                        this.#setVideo(currentVideo);
                    }
                    
                    if (this.#video.currentTime < this.#start)
                        this.#video.currentTime = this.#start;

                    if (this.#video.currentTime >= this.#end) {
                        this.#video.currentTime = this.#start;
                        sleep(1, () => {
                            if (this.#video !== null && this.#video.paused)
                                this.#video.play();
                        });
                    }
                }
            }
        }

        #setVideo(video: HTMLVideoElement | null) {
            this.#video = video;
        }
    }
    
    const sleep = (second: number, callbackFunc: (arg?: any) => void, arg: any = null) => {
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
        }, {once: true});
    }
    
}) ();