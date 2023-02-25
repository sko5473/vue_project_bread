<template>
    <div id="admin_wrap">
        <div id="menu_box">
            <ul id="menu">
                <RouterLink to="/admin" style="color:black;text-decoration-line:none;">
                    <li>1:1문의사항 답변</li>
                </RouterLink>
                <RouterLink to="/adminchart" style="color:black;text-decoration-line:none;">
                    <li>통계</li>
                </RouterLink>
            </ul>
        </div>

        <div id="statistics_wrap">
            <div id="statistics_leftup" class="charts">
                <p class="chart_title">월별 방문자수</p>
                <canvas id="myChart1" width="380px" height="280px"></canvas>
            </div>

            <div id="statistics_rightup" class="charts" style="margin-left:70px;">
                <p class="chart_title">월별 리뷰 카운트 수</p>
                <canvas id="myChart2" width="380px" height="280px"></canvas>
            </div>

            <div id="statistics_leftdown" class="charts" style="margin-top:30px;">
                <p class="chart_title">월별 가입자 성별</p>
                <canvas id="myChart3" width="380px" height="280px"></canvas>
            </div>

            <div id="statistics_rightdown" class="charts" style="margin-top:30px;margin-left:70px;">
                <p class="chart_title">즐겨찾기 많은 순</p>
                <canvas id="myChart4" width="380px" height="280px"></canvas>
            </div>
            <!-- <div>
                <button @click="handleChartData()" style="margin-top:200px;">차트데이터변경</button>
            </div> -->
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, shallowRef } from 'vue';
import { Chart } from 'chart.js/auto'
import axios from 'axios';

export default {
    setup() {
        const state = reactive({
            chart1: '',
            chart2: '',
            chart3: '',
            chart4: '',
        });

        //월별 리뷰카운트 수 조회 후 결과 차트2 반영
        const calcreviewcount = async () => {
            const url = `/api/bakeryreview/selectreviewcountforchart.json`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                state.chart2.data.datasets[0].data = data.total;
                state.chart2.update();
            }
        }

        //남녀 성비 조회 후 차트3 반영
        const calcgenderrate = async () => {
            const url = `/api/user/selectusergenderrate.json`;
            const headers = { "Content-Type": "application/json" };
            const  data  = await axios.get(url, { headers });
            console.log("남녀성비", data);

            if (data.status === 200) {
                state.chart3.data.datasets[0].data.push(data.maleTotal);
                state.chart3.data.datasets[1].data.push(data.femaleTotal);
                state.chart3.update();
            }
        }

        //즐겨찾기 많은 순 내림차순 정렬 후 차트4 반영
        const calcstarcount = async () => {
            const url = `/api/bakery/selectshoporderbystar.json`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                for (var i = 0; i < data.result.length; i++) {
                    state.chart4.data.datasets[0].data.push(data.result[i].bookmarkcount);
                    state.chart4.data.labels.push(data.result[i].name);
                }
                state.chart4.update();
            }
        };

        //월별 방문자수 차트 config
        const visitCountConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: '방문자 수',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
            },
        };

        //월별 리뷰 카운트 차트 config
        const reviewCountConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: '리뷰 카운트',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
            },
        };

        //차트 성비 config
        const genderConfig = {
            type: 'bar',
            data: {
                labels: ['성비'],
                datasets: [
                    {
                        label: '남자',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    },
                    {
                        label: '여자',
                        data: [],
                        borderColor: 'rgb(240, 180, 120)',
                        backgroundColor: 'rgba(240, 180, 120, 0.2)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
            },
        };

        //즐겨찾기 많은 순 차트 config
        const starConfig = {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: '즐겨찾기 수',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
            },
        };

        //차트 데이터 변경
        // const handleChartData = () => {
        //     state.chart3.data.datasets[0].data = [45, 78, 23, 78, 67, 34, 42];
        //     state.chart3.data.datasets[1].data = [49, 52, 33, 24, 38, 37, 45];
        //     state.chart3.update();
        // }

        //차트 구성
        const initChart = () => {
            const ctx1 = document.getElementById('myChart1');
            state.chart1 = shallowRef(new Chart(ctx1, visitCountConfig));

            const ctx2 = document.getElementById('myChart2');
            state.chart2 = shallowRef(new Chart(ctx2, reviewCountConfig));

            const ctx3 = document.getElementById('myChart3');
            state.chart3 = shallowRef(new Chart(ctx3, genderConfig));

            const ctx4 = document.getElementById('myChart4');
            state.chart4 = shallowRef(new Chart(ctx4, starConfig));
        };

        onMounted(() => {
            initChart(); // 설정 반영한 차트 생성
            calcreviewcount(); // 차트용 리뷰카운트 수
            calcstarcount(); //차트용 즐겨찾기 수
            calcgenderrate(); // 차트용 남녀성비
        });

        return {
            state, //상태변수
            // handleChartData, //차트3 데이터 변경
        }
    }
}
</script>

<style lang="css" scoped>
#admin_wrap {
    width: 1440px;
    margin: 0 auto;
    overflow: hidden;
}

#menu_box {
    background: antiquewhite;
    width: 350px;
    height: 750px;
    float: left;
}

#menu {
    padding: 40px;
    margin-left: 20px;
}

#menu li {
    margin-top: 15px;
    font-weight: bold;
    cursor: pointer;
    font-size: 17px;
    font-family: custom_font2;
}

#statistics_wrap {
    width: 1000px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
}

.charts {
    float: left;
    margin-left: 30px;
    border: 1px solid #cccccc;
}

.chart_title {
    font-family: custom_font2;
    font-size: 17px;
    text-align: center;
}
</style>