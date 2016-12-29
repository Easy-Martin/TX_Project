import request from "superagent";

export default class extends think.controller.base {
    async indexAction(){
            let parse1 = {
                AES:'iFn+pNoTzqp9rkylaTxcCfQ3KT86d8rZziBVEcJ7QYSEJGifyqPzXovWzQZp0XulbAIZqtBfhJVe/fHqFBozzBAENAYqnjcPx+WDYcu8P2DJWAMArAgFvZnz4w1VtMo54aRiN+IuBtgs/dNoE4AGvDJKhpiWs4/E062PGM2GV3s8LyL7g2d2/EJKxnHs722UjrX882aBxsB+cPQzUx4maMBW6GB2LWa0JHKkKAyOHNyokwPeHZ+PAyu573E0mPBOrT+u9aBFsAZOPXghroqIieS8sN5H+QdgO9ZlE17Xbs8='
            }
            let parse2 = {
                AES:'zMWQwKgjOXpI84PtSEFZpUCpx+xsIxdAysr5V/BdQO3IUjVFBJNS0LCkWl5nnrL9J1FppJh3DN5ZuGLJpiKoVd3CyltQNwozEiVMEosypeXqG4mD3DqsdZ3xb6vRwGFJtNreZobMi14zAgPLj0Kpv93ioohOBkdbRotDMVVTEItmRLAtEgtOnxIq4XbOe4RcUMYPUZmw5SyYvuKSo+bfnIAqHrnmj4gV+3Vem2zisKOIaZhz3zuMQg9f8gP6mn1whjE7W8t7kSj/SqcgckqEz9I2zEn2OItNlWMdSmAc63s='
            }
            let parse3 = {
                AES:'I1Wl+X77LYW+Qlfil8F35gHax6dLLB8mQeXXnfka9/EQIClz+wi4Pxp0FlqS7UJOqcduyINwzxHD6OiMpN/u6QbCaiQC7ZEWr9jWKPIXURrNCkMkRnyTqMAoUXNYzcSOMr35XkosG5TiL7pNJqB3806kovNT+DYwNVptwTsXF+UzidXwodPAaT3X3J9bmbGg3oGjpiK8TUxA4c5xNysd2cJWV2aSb59V50kjaWC7Ij0vP5EkAWzZg7srvVk/AHlDA1GFQo7a1CxjTbVZtm9TDEDDay2je8705r6q/cg3+IA='
            }
            let result1 = await think.await('get_data',()=>{
                let req = request.post('http://www.nbybt.cn/ybquery/gjw/getGJW1001').set('Content-Type', 'application/x-www-form-urlencoded').send(parse1);
                let fn = think.promisify(req.end, req);
                return fn();
            });
            let result2 = await think.await('get_data',()=>{
                let req = request.post('http://www.nbybt.cn/ybquery/gjw/getGJW1001').set('Content-Type', 'application/x-www-form-urlencoded').send(parse2);
                let fn = think.promisify(req.end, req);
                return fn();
            });
            let result3 = await think.await('get_data',()=>{
                let req = request.post('http://www.nbybt.cn/ybquery/gjw/getGJW1001').set('Content-Type', 'application/x-www-form-urlencoded').send(parse3);
                let fn = think.promisify(req.end, req);
                return fn();
            });
            console.log(result1.text)
            console.log(result2.text)
            console.log(result3.text)
    }
    async limitAction(){
        let dataList = [{
            parse:{AES:'iFn+pNoTzqp9rkylaTxcCfQ3KT86d8rZziBVEcJ7QYSEJGifyqPzXovWzQZp0XulbAIZqtBfhJVe/fHqFBozzBAENAYqnjcPx+WDYcu8P2DJWAMArAgFvZnz4w1VtMo54aRiN+IuBtgs/dNoE4AGvDJKhpiWs4/E062PGM2GV3s8LyL7g2d2/EJKxnHs722UjrX882aBxsB+cPQzUx4maMBW6GB2LWa0JHKkKAyOHNyokwPeHZ+PAyu573E0mPBOrT+u9aBFsAZOPXghroqIieS8sN5H+QdgO9ZlE17Xbs8='},
        },{
            parse:{AES:'zMWQwKgjOXpI84PtSEFZpUCpx+xsIxdAysr5V/BdQO3IUjVFBJNS0LCkWl5nnrL9J1FppJh3DN5ZuGLJpiKoVd3CyltQNwozEiVMEosypeXqG4mD3DqsdZ3xb6vRwGFJtNreZobMi14zAgPLj0Kpv93ioohOBkdbRotDMVVTEItmRLAtEgtOnxIq4XbOe4RcUMYPUZmw5SyYvuKSo+bfnIAqHrnmj4gV+3Vem2zisKOIaZhz3zuMQg9f8gP6mn1whjE7W8t7kSj/SqcgckqEz9I2zEn2OItNlWMdSmAc63s='}
        },{
            parse:{AES:'I1Wl+X77LYW+Qlfil8F35gHax6dLLB8mQeXXnfka9/EQIClz+wi4Pxp0FlqS7UJOqcduyINwzxHD6OiMpN/u6QbCaiQC7ZEWr9jWKPIXURrNCkMkRnyTqMAoUXNYzcSOMr35XkosG5TiL7pNJqB3806kovNT+DYwNVptwTsXF+UzidXwodPAaT3X3J9bmbGg3oGjpiK8TUxA4c5xNysd2cJWV2aSb59V50kjaWC7Ij0vP5EkAWzZg7srvVk/AHlDA1GFQo7a1CxjTbVZtm9TDEDDay2je8705r6q/cg3+IA='}
        }];
        //result 为每条处理结果集合
        //如果某些条数据处理异常，那么对应的数据为 undefined，处理时需要过滤下
        let result = await think.parallelLimit(dataList, item => {
            let url = 'http://www.nbybt.cn/ybquery/gjw/getGJW1001';
            let req = request.post(url).set('Content-Type', 'application/x-www-form-urlencoded').send(item.parse);
            let fn = think.promisify(req.end, req); //将 end 方法包装成 Promise
            return fn();
        }, {
        limit: 20, //一次执行 10 条
            ignoreError: true
        })
        let arr = []
        result.forEach((item,index)=>{
            arr.push(item.body.result.register.xm);
            
        })
        return this.success(arr)
    }
        
}