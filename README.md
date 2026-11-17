# SDC LIFE · 빛을 만드는 사람들

**[애니메이션 보기](https://waterfirst.github.io/SDC_LIFE/)**

스마트폰용 OLED 패널을 만드는 노동자들의 하루를 그린 인터랙티브 선화입니다.

- 아침: 통근버스, SECOM 사원증 확인, 식당 대기와 테이크아웃, 사무실 이동
- 작업: 컴퓨터 앞의 엔지니어와 패널을 점검하는 작업자
- 점심: 건물을 가리지 않는 단풍나무, 벤치의 도시락·커피·대화, 남녀 동료 다섯 명의 산책
- 저녁: 사무실에서 이어지는 퇴근 줄과 통근버스 대기
- 밤: 조명이 켜진 사무실과 생산 현장

처음에는 점심 풍경이 열립니다. 하단에서 시간을 선택하거나 해와 달을 드래그하세요.
사람, 나무, 장비와 버스를 누르면 반응합니다. `시간 흐르기`는 하루의 흐름을 재생합니다.

삼성디스플레이의 OLED 사업을 소재로 한 **독립적인 창작물**입니다.
실제 직원, 공장 배치, 근무표, 출입 보안 절차를 재현한 자료가 아니며 공식 제작물이 아닙니다.
[소재 참고: 삼성디스플레이](https://global.samsungdisplay.com/overview)

## 실행

Node.js 22.18 이상이 필요합니다.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
```

## GitHub Pages

Settings → Pages → Source를 **GitHub Actions**로 설정합니다.
`main`에 코드를 올리면 `.github/workflows/pages.yml`이 타입 검사와 빌드를 실행한 뒤
`dist/`를 Pages에 배포합니다. Actions 화면에서 수동 실행도 가능합니다.
배포 경로는 저장소 이름으로 자동 설정됩니다.

## 출처와 라이선스

[JDhruv14/line-art-animation](https://github.com/JDhruv14/line-art-animation)의
SVG 그리기·보행·움직임 라이브러리와 예제를 기반으로 수정했습니다.
원저작권 고지와 MIT 라이선스는 [LICENSE](LICENSE)에 보존했습니다.
