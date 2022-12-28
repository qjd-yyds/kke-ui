<style scoped lang="scss">
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 410px;
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #fff;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #0fc37c;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: #fff;
  position: relative;
}
.wh_content_item {
  height: 40px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: yellow;
  border-radius: 100px;
}
.wh_content_item .wh_chose_day {
  background: green;
  border-radius: 100px;
}
.wh_content_all {
  background-color: #fff;
.wh_content_item {
  color: #262626;
}
.wh_top_changge li {
  color: #262626;
}
.wh_jiantou1 {
  border-top: 2px solid #262626;
  border-left: 2px solid #262626;
}
.wh_jiantou2 {
  border-top: 2px solid #262626;
  border-right: 2px solid #262626;
}
.wh_content:last-child {
  background-color: #F5F7FA;
  border-radius: 2px;
  padding-bottom: 10px;
}
.wh_isToday {
  background-color: #f5f7fa;
  color: #fff;
  border-radius: 4px;
  position: relative;
&::before {
   content: '今';
   position: absolute;
   left: 0;
   top: 0;
   width: 40px;
   height: 40px;
   color: #000;
   background-color: #f5f7fa;
   border-radius: 4px;
 }
&:hover {
&::before {
   background-color: #7699f1!important;
   color: #fff;
 }
}
&.wh_chose_day {
&::before {
   background-color: #4070EC !important;
   color: #fff;
 }
}
}
.wh_item_date:hover {
  background-color: #7699f1!important;
  color: #fff;
  border-radius: 4px;
}
.wh_chose_day {
  background-color: #4070EC!important;
  color: #fff;
  border-radius: 4px;
}
.wh_content_item>.wh_isMark {
  background-color: transparent;
  border-radius: 4px;
  position: relative;
&::after {
   content: '';
   width: 30px;
   height: 30px;
   position: absolute;
   background-image: url("~@/project/common/assets/img/mhHome/circle.png");
   background-size: 100% 100%;
   background-position: 0 0;
 }
}
.wh_content_item>.wh_isFinish {
  background-color: transparent;
  border-radius: 4px;
  position: relative;
&::after {
   content: '';
   width: 30px;
   height: 30px;
   position: absolute;
   background-image: url("~@/project/common/assets/img/mhHome/circle_green.png");
   background-size: 100% 100%;
   background-position: 0 0;
 }
}
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div v-for="tag in textTop" class="wh_content_item">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div v-for="(item,index) in list" class="wh_content_item" @click="clickDay(item,index)">
          <div
            class="wh_item_date"
            :class="[{wh_isFinish: item.isFinishAll},{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]"
          >{{item.id}}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar';

export default {
  props: {
    testFinish: {
      type: Array,
      default: () => [],
    },
    markDate: {
      type: Array,
      default: () => [],
    },
    markDateMore: {
      type: Array,
      default: () => [],
    },
    textTop: {
      type: Array,
      default: () => [ '一', '二', '三', '四', '五', '六', '日' ],
    },
    sundayStart: {
      type: Boolean,
      default: () => false,
    },
    agoDayHide: {
      type: String,
      default: '0',
    },
    futureDayHide: {
      type: String,
      default: '2554387200',
    },
  },
  data () {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: '',
    };
  },
  watch:  {
    markDate: {
      handler (val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    markDateMore: {
      handler (val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    agoDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    futureDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    sundayStart: {
      handler (val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true,
    },
  },
  created () {
    this.intStart();
    this.myDate = new Date();
  },
  mounted () {
    this.getList(this.myDate);
  },
  methods: {
    intStart () {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass (data) {
      const obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay (item, index) {
      console.log(item);
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs () {
      let { markDate, testFinish } = this;
      let { markDateMore } = this;
      markDate = markDate.map((k) => timeUtil.dateFormat(k));
      testFinish = testFinish.map((k) => timeUtil.dateFormat(k));
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [ markDate, markDateMore, testFinish ];
    },
    getList (date, chooseDay, isChosedDay = true) {
      const [ markDate, markDateMore, testFinish ] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      const arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = '';
        const k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || '';
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        // 测试是否全部完成
        k.isFinishAll = testFinish.indexOf(nowTime) > -1;
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit('isToday', nowTime);
        }
        const flag = !k.dayHide && k.otherMonth === 'nowMonth';
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime
          && !chooseDay
          && flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    },
  },
};
</script>
