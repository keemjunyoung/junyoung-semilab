# Project 01 — SECOM Semiconductor Process Data Analysis

## Goal

반도체 제조 공정에서 수집된 익명 센서/측정 데이터를 이용해 **불량(Fail)을 구분할 수 있는 신호와 패턴을 찾는 과정**을 학습하고 기록합니다.

이 프로젝트의 목표는 단순히 높은 분류 정확도를 만드는 것이 아닙니다.

1. 공정 데이터의 구조와 품질을 확인한다.
2. 결측치와 불필요한 변수를 처리한다.
3. Pass / Fail의 데이터 불균형을 이해한다.
4. 불량과 관련성이 높은 변수 후보를 찾는다.
5. 머신러닝 모델로 불량을 분류한다.
6. 모델이 중요하게 본 변수를 엔지니어 관점에서 해석한다.

> 주의: SECOM의 개별 feature는 실제 물리 변수명이 공개되지 않은 익명 변수입니다. 따라서 특정 feature를 온도, 압력, 유량 등의 실제 공정 파라미터라고 임의로 해석하지 않습니다.

## Project Roadmap

### Step 1 — Data Understanding & Basic EDA
- 데이터 로드
- 데이터 크기 확인
- Pass / Fail 비율 확인
- 결측치 확인
- 상수 변수 확인
- 기본 시각화

### Step 2 — Data Cleaning
- 결측률이 지나치게 높은 변수 검토
- 상수 변수 제거
- 결측값 대체
- 학습/검증 데이터 분리

### Step 3 — EDA & Feature Screening
- Pass / Fail별 변수 분포 비교
- 변수 간 상관관계 확인
- 불량과 관련성이 높은 변수 후보 탐색

### Step 4 — Baseline Classification
- Logistic Regression
- Random Forest
- Accuracy가 아닌 Recall / Precision / F1 / Balanced Accuracy 중심 평가

### Step 5 — Feature Importance
- 모델 기반 중요도
- Permutation Importance 또는 SHAP
- 주요 변수 후보 도출

### Step 6 — Engineering Interpretation
- AI 결과를 원인으로 단정하지 않고 "추가 확인이 필요한 공정 신호 후보"로 해석
- 실제 Fab이라면 어떤 공정 step / 장비 / 센서 정보를 추가 확인할지 정리

## Data

- Dataset: SECOM
- Samples: 1,567
- Anonymous process/sensor features: 590
- Target: Pass (-1) / Fail (1)
- Timestamp: provided with labels

원본 출처는 UCI Machine Learning Repository의 SECOM 데이터셋입니다. 분석 노트북에서는 UCI 원본 URL을 먼저 시도하고, 접속 문제가 있는 경우 공개 GitHub mirror를 fallback으로 사용하도록 구성합니다.

## Current Status

- [x] 프로젝트 구조 설계
- [x] Step 1 분석 코드 작성
- [ ] Step 1 실행 및 결과 확인
- [ ] Step 2 전처리
- [ ] Step 3 주요 변수 탐색
- [ ] Step 4 분류 모델
- [ ] Step 5 중요 변수 해석
- [ ] Step 6 홈페이지 포트폴리오 정리
