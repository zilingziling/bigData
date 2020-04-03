import Mock from "mockjs";

/*

mock.mock()
参数1：请求地址 选填  url
参数2: 请求类型 选填  type
参数3：数据模板 | 函数    
*/

var data = Mock.mock({
    "data|100": [   //意思是data数组中有100条数据
        {  //这个对象是用来写数据模板的
            "id|+1": 0,   //初始值是0每次id都+1
            "goodsName": "@ctitle(3, 5)",   //看官网，这个名字是3-5之间的
            "goodsPrice|+1": 100,   //这个类似上面的id一个，只是初始值是从100开始的
            "address": "@county(true)",   //这个是地址，@county(true)  对象的属性值都是mock.mock()提供的方法，直接拿过来用就可以了
            "tel": /^1(3|5|7|8|9)\d{9}$/,   //正则写的电话后面1开头，正则不懂自己去学！！！！！！！！！！！很重要
            "goodsImg": "@image('200x100', '#894FC4', '#FFF', '我爱你...')", // 图片
            "date": '@date("yyyy-MM-dd M:dd:d")',  //时间
            "email": "@email()"  //邮箱
        }
    ]
})


// console.log(data);//打印这Mock.mock() 赋值的内容，直接在终端运行就 可以了
//上面就实现了数据的生成了

//去拦截AJAX
// Mock.mock(/\goods\/goodsList/,"get",function(options){
//   console.log(options);  //
//   console.log(url.parse(options.url,true));
//   console.log(url.parse(options.url,true).query)  //下面会用到
// })

//  .........这个是通过get  拦截的AJAX
// Mock.mock(/\goods\/goodsList/,"get",function(options){
//     let {limit,page} = url.parse(options.url,true).query;// 解构赋值，结合上面看就懂了
//     // return data.data.slice(0,4);//获取0-4条的数据，在app.vue 中可以打印查看
//     return data.data.slice((page-1)*limit,(limit*page)-1)  //data.data是上面的数据，这里获取的是
// })

//参数1：是一个rul ，是正则来写的，意思是：/goods/goodsList


//............这个是拦截  post 提交的数据
Mock.mock(/\goods\/goodsList/, "post", function (options: any) {
    console.log(options);//数据在body中
    let { limit, page } = JSON.parse(options.body);  //从body中获取数据，然后解构赋值

    // return data.data.slice((page - 1) * limit, (limit * page) - 1)
    return {
        code: 0,
        data: data.data.slice((page - 1) * limit, (limit * page) - 1),
        msg: "请求成功"
    }
})

Mock.mock('/api/resource/gross', "post", function (options: any) {
    return {
        code: 0,
        data: {
            course: 584,
            play: 9,
            courseList: [
                {
                    name: "科目一",
                    value: 1000
                },
                {
                    name: "科目二",
                    value: 800
                },
                {
                    name: "科目三",
                    value: 400
                },
            ],
            playList: [
                {
                    name: "课程一",
                    value: 900
                },
                {
                    name: "课程二",
                    value: 800
                },
                {
                    name: "课程三",
                    value: 500
                },
            ]
        },
        msg: "请求成功"
    }
})

Mock.mock('/api/resource/increase', "post", function (options: any) {
    let { type } = JSON.parse(options.body);  //从body中获取数据，然后解构赋值
    let data: any;
    if (type == "week") {

        data = {
            x: ["2011年",
                "2012年",
                "2013年",
                "2014年",
                "2015年",
            ],
            y: [30, 50, 44, 62, 51]
        }
    } else {
        data = {
            x: ["2011年",
                "2012年",
                "2013年",
                "2014年",
                "2015年",
                "2016年",
                "2017年"],
            y: [30, 50, 44, 62, 51, 45, 58]
        }
    }
    return {
        code: 0,
        data,
        msg: "请求成功"
    }
})

Mock.mock('/api/resource/allresource', "post", function (options: any) {
    let { type } = JSON.parse(options.body);  //从body中获取数据，然后解构赋值
    let data: any;
    if (type == "week") {
        data = {
            x: ["2011年",
                "2012年",
                "2013年",
                "2014年",
                "2015年",
            ],
            y: [30, 50, 44, 62, 51]
        }
    } else if (type == "month") {
        data = {
            x: ["2011年",
                "2012年",
                "2013年",
                "2014年",
                "2015年",
                "2016年",
                "2017年"],
            y: [30, 50, 44, 62, 51, 45, 58]
        }
    } else {
        data = {
            x: ["2011年",
                "2012年",
                "2013年",
                "2014年",
                "2015年",
                "2016年",
                "2017年", "2018年",
                "2019年"],
            y: [30, 50, 44, 62, 51, 45, 58, 20, 33]
        }
    }
    return {
        code: 0,
        data,
        msg: "请求成功"
    }
})

Mock.mock('/api/resource/teacherReputation', "post", function (options: any) {
    let { type } = JSON.parse(options.body);  //从body中获取数据，然后解构赋值
    let data: any;
    if (type == "month") {
        data = [
            {
                abbreviation: "李",
                name: "李大仙",
                score: "5.0",
                id: 1
            },
            {
                abbreviation: "周",
                name: "周大仙",
                score: "5.0",
                id: 2
            },
            {
                abbreviation: "张",
                name: "张大仙",
                score: "4.7",
                id: 3
            },
            {
                abbreviation: "王",
                name: "王大仙",
                score: "4.5",
                id: 4
            },
            {
                abbreviation: "寇",
                name: "寇大仙",
                score: "4.0",
                id: 5
            },
            {
                abbreviation: "赵",
                name: "赵大仙",
                score: "3.0",
                id: 6
            },
            {
                abbreviation: "项",
                name: "项大仙",
                score: "3.0",
                id: 7
            },
            {
                abbreviation: "陌",
                name: "陌大仙",
                score: "3.0",
                id: 8
            },
        ]
    } else {
        data = [
            {
                abbreviation: "项",
                name: "项小仙",
                score: "5.0",
                id: 1
            },
            {
                abbreviation: "李",
                name: "李小仙",
                score: "5.0",
                id: 2
            },
            {
                abbreviation: "潘",
                name: "潘小仙",
                score: "5.0",
                id: 3
            },
            {
                abbreviation: "胡",
                name: "胡小仙",
                score: "4.5",
                id: 4
            },
            {
                abbreviation: "王",
                name: "王小仙",
                score: "4.0",
                id: 5
            },
            {
                abbreviation: "侃",
                name: "侃小仙",
                score: "3.0",
                id: 6
            },
            {
                abbreviation: "罗",
                name: "罗小仙",
                score: "3.0",
                id: 7
            },
            {
                abbreviation: "赖",
                name: "赖小仙",
                score: "3.0",
                id: 8
            },
        ]
    }
    return {
        code: 0,
        data,
        msg: "请求成功"
    }
})

Mock.mock('/api/resource/coursesCollect', "post", function (options: any) {
    let { type } = JSON.parse(options.body);  //从body中获取数据，然后解构赋值
    let data: any;
    if (type == "month") {
        data = [{
            name: "项目一",
            value: 80
        },
        {
            name: "项目二",
            value: 78
        },
        {
            name: "项目三",
            value: 60
        },
        {
            name: "项目四",
            value: 50
        },
        {
            name: "项目五",
            value: 45
        }]
    } else {
        data = [{
            name: "项目一",
            value: 100
        },
        {
            name: "项目二",
            value: 98
        },
        {
            name: "项目三",
            value: 96
        },
        {
            name: "项目四",
            value: 95
        },
        {
            name: "项目五",
            value: 90
        }]
    }
    return {
        code: 0,
        data,
        msg: "请求成功"
    }
})
Mock.mock('/api/resource/goodCourses', "post", function (options: any) {
    let { type } = JSON.parse(options.body);  //从body中获取数据，然后解构赋值
    let data: any;
    if (type == "month") {
        data = [{
            name: "项目一",
            value: 80
        },
        {
            name: "项目二",
            value: 78
        },
        {
            name: "项目三",
            value: 60
        },
        {
            name: "项目四",
            value: 50
        },
        {
            name: "项目五",
            value: 45
        }]
    } else {
        data = [{
            name: "项目一",
            value: 100
        },
        {
            name: "项目二",
            value: 98
        },
        {
            name: "项目三",
            value: 96
        },
        {
            name: "项目四",
            value: 95
        },
        {
            name: "项目五",
            value: 90
        }]
    }
    return {
        code: 0,
        data,
        msg: "请求成功"
    }
})
Mock.mock('/api/resource/coursesScore', "post", function (options: any) {
    let { type } = JSON.parse(options.body);  //从body中获取数据，然后解构赋值
    let data: any;
    if (type == "month") {
        data = {
            coursesList: [
                {
                    name: "测试区11年级1班语文",
                    score: "5.0",
                    id: 1
                },
                {
                    name: "测试区11年级2班语文",
                    score: "4.8",
                    id: 2
                },
                {
                    name: "测试区11年级3班语文",
                    score: "4.6",
                    id: 3
                },
                {
                    name: "测试区11年级4班语文",
                    score: "4.6",
                    id: 4
                },
                {
                    name: "测试区11年级5班语文",
                    score: "4.0",
                    id: 5
                },
            ],
            pieData: [{
                name: "0-1分",
                value: 40
            },
            {
                name: "1-2分",
                value: 78
            },
            {
                name: "2-3分",
                value: 60
            },
            {
                name: "3-4分",
                value: 80
            },
            {
                name: "4-5分",
                value: 45
            }]
        }
    } else {
        data = {
            coursesList: [
                {
                    name: "测试区22年级1班语文",
                    score: "5.0",
                    id: 6
                },
                {
                    name: "测试区22年级2班语文",
                    score: "5.0",
                    id: 7
                },
                {
                    name: "测试区22年级3班语文",
                    score: "4.8",
                    id: 8
                },
                {
                    name: "测试区22年级4班语文",
                    score: "4.6",
                    id: 9
                },
                {
                    name: "测试区22年级5班语文",
                    score: "4.0",
                    id: 11
                },
            ],
            pieData: [{
                name: "0-1分",
                value: 80
            },
            {
                name: "1-2分",
                value: 120
            },
            {
                name: "2-3分",
                value: 130
            },
            {
                name: "3-4分",
                value: 200
            },
            {
                name: "4-5分",
                value: 45
            }]
        }
    }
    return {
        code: 0,
        data,
        msg: "请求成功"
    }
})
Mock.mock('/api/resource/clientProbably', "post", function (options: any) {
    let data: any;
    data = [{
        name: "覆盖科目数",
        value: 8118
    },
    {
        name: "总使用天数",
        value: 8
    },
    {
        name: "教师平台数",
        value: 83338
    },
    {
        name: "覆盖年级数",
        value: 848
    },
    {
        name: "学生数",
        value: 8
    },
    {
        name: "新闻数",
        value: 8668
    },
    {
        name: "评价数",
        value: 87778
    },
    {
        name: "收藏数",
        value: 8008
    }]

    return {
        code: 0,
        data,
        msg: "请求成功"
    }
})

/*
注意：post提交的数据不在URL里面，所以
*/