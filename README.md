### 1. D3.js를 이용한 데이터 시각화 실습
![image](https://user-images.githubusercontent.com/64249489/168546428-7789955b-d1fb-4595-abdf-66f27f220ce2.png)

### 2. 데이터 포맷

```javascipt
  {
      "key": "Val-01",
      "values": [{"toolTip":"Tooltip"}],
      "accValue": 100,
      "accValues": {
          "label_01": 30,
          "label_02: 40,
          "label_03: 20,
          "label_04: 10
    },
  }

```
### 3. 내용
- 수신한 데이터 값을 차트화
- 하나의 바에 네가지 범례별 수치가 들어감
- 바의 위쪽에는 총 수치가 표시됨
