<template>
    <div class="traffic_light">
        <div class="lamp lamp_red"
            :class="{ active: activeColor === 'red', red_blink: this.timeCounter < timeToBlink && activeColor === 'red' }"
        >
            <p v-if="activeColor === 'red'" class="counter">{{ this.timeCounter }}</p>
        </div>
        <div class="lamp lamp_yellow"
            :class="{ active: activeColor === 'yellow', yellow_blink: this.timeCounter < timeToBlink && activeColor === 'yellow' }"
        >
            <p v-if="activeColor === 'yellow'" class="counter">{{ this.timeCounter }}</p>
        </div>
        <div class="lamp lamp_green"
            :class="{ active: activeColor === 'green', green_blink: this.timeCounter < timeToBlink && activeColor === 'green' }"
        >
            <p v-if="activeColor === 'green'" class="counter">{{ this.timeCounter }}</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: "traffic-light",
    data: () => ({
        intervals: {
            red: 10000,
            yellow: 3000,
            green: 15000,
        },
        currentTime: null,
        nextColor: null,
        isYellowRed: false,
        timerId: null,
        timeToBlink: 3,
    }),
    computed: {
        activeColor () {
            return this.$route.name;
        },
        timeCounter () {
            return this.currentTime / 1000;
        }
    },
    methods: {
        timerForChangeColor () {
            if (this.activeColor === 'red') {
                this.currentTime = this.intervals.red;
                this.isYellowRed = false;
                this.nextColor = 'yellow';
            } else if (this.activeColor === 'yellow') {
                this.nextColor = this.isYellowRed ? 'red' : 'green';
                this.currentTime = this.intervals.yellow;
            } else if (this.activeColor === 'green') {
                this.currentTime = this.intervals.green;
                this.isYellowRed = true;
                this.nextColor = 'yellow';
            }
            this.countdownTimer();
            setTimeout(this.changeColorAndCallTimer, this.currentTime);
        },
        changeColorAndCallTimer () {
            this.stopTimer();
            this.$router.push({ name: `${this.nextColor}` }).catch(err => { err });
            this.timerForChangeColor();
        },
        countdownTimer() {
            this.timerId = setInterval(() => {
                 this.currentTime -= 1000;
            }, 1000)
        },
        stopTimer() {
            clearTimeout(this.timerId);
        }
    },
    created () {
        this.timerForChangeColor();
    }
  }
</script>

<style scoped>
    .traffic_light {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 0 auto;
        width: 130px;
        height: 300px;
        background: black;
        border-radius: 2%;
    }
    .lamp {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        width: 70px;
        border-style: solid;
        border-width: 2px;
        border-radius: 5%;
    }
    .lamp_red {
        background-color: #D50000;
        opacity: 0.2;
    }
    .lamp_yellow {
        background-color: #F9A825;
        opacity: 0.2;
    }
    .lamp_green {
        background-color: #2E7D32;
        opacity: 0.2;
    }
    .active {
        opacity: 1;
    }
    .counter {
        font-size: 30px;
        color: #fff;
    }
    .red_blink, .yellow_blink, .green_blink {
        animation-duration: 400ms;
        animation-name: blink;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    .red_blink {
        animation-name: blink-red;
    }
    .yellow_blink {
        animation-name: blink-yellow;
    }
    .green_blink {
        animation-name: blink-green;
    }
    @keyframes blink-red {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.2;
        }
    }
    @keyframes blink-yellow {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.2;
        }
    }
    @keyframes blink-green {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.2;
        }
    }
</style>
