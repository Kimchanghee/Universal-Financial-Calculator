import { CalculatorType } from './constants';
import type { SeoData } from './types';

const createStructuredData = (name: string, description: string, language: string): object => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires a modern web browser.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": description,
  "inLanguage": language
});

const seoConfig: Record<string, Record<string, SeoData>> = {
  en: {
    default: {
      title: 'Universal Financial Calculator | Free & Accurate Online Tool',
      description: 'Calculate compound interest, simple interest, savings goals, and ROI with our free, multi-language financial calculator. Easy to use for all your financial planning needs.',
      keywords: 'financial calculator, interest calculator, investment calculator, savings calculator, ROI calculator, free financial tools, online calculator, money calculator, financial planning tools, mortgage calculator, loan calculator',
      structuredData: createStructuredData('Universal Financial Calculator', 'A comprehensive financial calculator supporting compound interest, simple interest, savings goals, and ROI calculations.', 'en')
    },
    [CalculatorType.COMPOUND_INTEREST]: {
      title: 'Compound Interest Calculator | Future Value Investment Growth',
      description: 'Easily calculate the future value of your investment with our compound interest calculator. See how your money can grow over time with principal, interest rate, time, and contributions.',
      keywords: 'compound interest calculator, future value calculator, investment growth, retirement savings, financial planning, savings growth calculator, calculate compound interest, investment return calculator, compounding returns, interest on interest',
      structuredData: createStructuredData('Compound Interest Calculator', 'Easily calculate the future value of your investment with our compound interest calculator.', 'en')
    },
    [CalculatorType.SIMPLE_INTEREST]: {
        title: 'Simple Interest Calculator | Easy Loan & Savings Calculation',
        description: 'Quickly calculate simple interest on loans or investments. Enter principal, rate, and time to find the total interest and final amount. A straightforward financial tool.',
        keywords: 'simple interest calculator, loan interest, savings interest, principal and interest, easy interest calculation, fixed interest calculator, simple loan calculator, how to calculate simple interest, interest formula',
        structuredData: createStructuredData('Simple Interest Calculator', 'Quickly calculate simple interest on loans or investments.', 'en')
    },
    [CalculatorType.SAVINGS_GOAL]: {
        title: 'Savings Goal Calculator | Plan Your Financial Future',
        description: 'Determine the monthly contributions needed to reach your savings goal. Perfect for planning for a house, car, retirement, or any major purchase. Set your goal and start saving.',
        keywords: 'savings goal calculator, financial planning, retirement calculator, monthly savings, investment goal, financial goal planner, how much to save monthly, dream savings calculator, future savings goal',
        structuredData: createStructuredData('Savings Goal Calculator', 'Determine the monthly contributions needed to reach your savings goal.', 'en')
    },
    [CalculatorType.ROI]: {
        title: 'ROI Calculator | Calculate Your Return on Investment',
        description: 'Measure the profitability of an investment with our easy-to-use ROI calculator. Enter your initial investment and final value to see your return on investment percentage and net profit.',
        keywords: 'ROI calculator, return on investment, investment profit, profitability analysis, financial metrics, calculate ROI, investment return, profit calculator, business ROI, what is ROI',
        structuredData: createStructuredData('ROI Calculator', 'Measure the profitability of an investment with our easy-to-use ROI calculator.', 'en')
    },
    [CalculatorType.LOAN]: {
      title: 'Loan & Mortgage Calculator | Calculate Monthly Payments',
      description: 'Estimate your monthly loan or mortgage payments. Enter loan amount, interest rate, and term to find your payment schedule, total interest, and total repayment amount.',
      keywords: 'loan calculator, mortgage calculator, monthly payment calculator, amortization schedule, loan amortization, auto loan calculator, personal loan calculator, loan payment schedule, interest rate calculator',
      structuredData: createStructuredData('Loan & Mortgage Calculator', 'Estimate your monthly loan or mortgage payments.', 'en')
    },
    [CalculatorType.RETIREMENT]: {
        title: 'Retirement Savings Calculator | Plan for Your Golden Years',
        description: 'Are you saving enough for retirement? Use our retirement calculator to see if you are on track to meet your retirement goals. Project your savings growth over time.',
        keywords: 'retirement calculator, retirement planning, 401k calculator, IRA calculator, retirement savings, pension calculator, nest egg goal, how much to retire, retirement fund calculator, retirement income planning',
        structuredData: createStructuredData('Retirement Savings Calculator', 'Use our retirement calculator to see if you are on track to meet your retirement goals.', 'en')
    },
    [CalculatorType.INFLATION]: {
        title: 'Inflation Calculator | See the Future Value of Money',
        description: 'Calculate the future value of a certain amount of money, considering the effects of inflation. Understand the impact of inflation on your purchasing power over time.',
        keywords: 'inflation calculator, purchasing power, value of money, CPI calculator, inflation rate, buying power calculator, real value of money, cost of living calculator, future money value, economic inflation',
        structuredData: createStructuredData('Inflation Calculator', 'Calculate the future value of a certain amount of money, considering the effects of inflation.', 'en')
    },
    [CalculatorType.TIP]: {
        title: 'Tip Calculator | Quickly Calculate Tips and Split Bills',
        description: 'A simple and fast tip calculator. Calculate the tip amount for a bill, split it among multiple people, and see the total amount per person. Ideal for dining out.',
        keywords: 'tip calculator, split the bill, gratuity calculator, restaurant tip, tipping guide, service tip calculator, how much to tip, bill splitting app',
        structuredData: createStructuredData('Tip Calculator', 'A simple and fast tip calculator to calculate tips and split bills.', 'en')
    },
    [CalculatorType.BREAK_EVEN]: {
        title: 'Break-Even Point Calculator | For Your Business',
        description: 'Find the break-even point for your business. Calculate how many units you need to sell or revenue you need to generate to cover your costs. Essential for business planning.',
        keywords: 'break-even point calculator, break-even analysis, business calculator, fixed costs, variable costs, profit analysis, BEP calculator, cost-volume-profit analysis, startup calculator, business profitability',
        structuredData: createStructuredData('Break-Even Point Calculator', 'Find the break-even point for your business.', 'en')
    }
  },
  ko: {
    default: {
      title: '범용 금융 계산기 | 무료 및 정확한 온라인 도구',
      description: '무료 다국어 금융 계산기로 복리, 단리, 저축 목표, 투자수익률(ROI)을 계산하세요. 모든 재무 계획 요구에 맞게 사용하기 쉽습니다.',
      keywords: '금융 계산기, 이자 계산기, 투자 계산기, 저축 계산기, ROI 계산기, 무료 금융 도구, 온라인 계산기, 돈 계산기, 재무 설계 도구, 주택담보대출 계산기, 대출 계산기',
      structuredData: createStructuredData('범용 금융 계산기', '복리, 단리, 저축 목표, 투자수익률(ROI)을 계산하는 다국어 금융 계산기.', 'ko')
    },
    [CalculatorType.COMPOUND_INTEREST]: {
      title: '복리 계산기 | 미래 가치 투자 성장률 계산',
      description: '복리 계산기를 사용하여 투자의 미래 가치를 쉽게 계산하세요. 원금, 이자율, 기간 및 기여금으로 시간이 지남에 따라 돈이 어떻게 성장할 수 있는지 확인하세요.',
      keywords: '복리 계산기, 미래 가치 계산기, 투자 성장, 은퇴 저축, 재무 계획, 저축 성장 계산기, 복리 계산법, 투자 수익률 계산기, 복리 수익, 이자에 이자',
      structuredData: createStructuredData('복리 계산기', '복리 계산기를 사용하여 투자의 미래 가치를 쉽게 계산하세요.', 'ko')
    },
    [CalculatorType.SIMPLE_INTEREST]: {
        title: '단리 계산기 | 간편한 대출 및 저축 계산',
        description: '대출 또는 투자의 단리를 빠르게 계산합니다. 원금, 이자율 및 기간을 입력하여 총 이자와 최종 금액을 찾으십시오. 간단한 금융 도구입니다.',
        keywords: '단리 계산기, 대출 이자, 저축 이자, 원금과 이자, 간편한 이자 계산, 고정 금리 계산기, 단리 대출 계산기, 단리 계산 방법, 이자 공식',
        structuredData: createStructuredData('단리 계산기', '대출 또는 투자의 단리를 빠르게 계산합니다.', 'ko')
    },
    [CalculatorType.SAVINGS_GOAL]: {
        title: '저축 목표 계산기 | 재정적 미래 계획',
        description: '저축 목표를 달성하는 데 필요한 월별 기여금을 결정하십시오. 집, 자동차, 은퇴 또는 주요 구매 계획에 적합합니다. 목표를 설정하고 저축을 시작하십시오.',
        keywords: '저축 목표 계산기, 재무 계획, 은퇴 계산기, 월별 저축, 투자 목표, 재정 목표 플래너, 매달 얼마를 저축해야 하는가, 꿈의 저축 계산기, 미래 저축 목표',
        structuredData: createStructuredData('저축 목표 계산기', '저축 목표를 달성하는 데 필요한 월별 기여금을 결정하십시오.', 'ko')
    },
    [CalculatorType.ROI]: {
        title: 'ROI 계산기 | 투자 수익률 계산',
        description: '사용하기 쉬운 ROI 계산기로 투자의 수익성을 측정하십시오. 초기 투자 및 최종 가치를 입력하여 투자 수익률 및 순이익을 확인하십시오.',
        keywords: 'ROI 계산기, 투자 수익률, 투자 이익, 수익성 분석, 금융 지표, ROI 계산법, 투자 수익, 이익 계산기, 비즈니스 ROI, ROI란 무엇인가',
        structuredData: createStructuredData('ROI 계산기', '사용하기 쉬운 ROI 계산기로 투자의 수익성을 측정하십시오.', 'ko')
    },
    [CalculatorType.LOAN]: {
      title: '대출 및 모기지 계산기 | 월 상환액 계산',
      description: '월별 대출 또는 모기지 상환액을 추정합니다. 대출 금액, 이자율 및 기간을 입력하여 상환 일정, 총 이자 및 총 상환 금액을 확인하세요.',
      keywords: '대출 계산기, 모기지 계산기, 월 상환액 계산기, 상환 스케줄, 대출 상환, 자동차 대출 계산기, 개인 대출 계산기, 대출 상환 일정, 이자율 계산기',
      structuredData: createStructuredData('대출 및 모기지 계산기', '월별 대출 또는 모기지 상환액을 추정합니다.', 'ko')
    },
    [CalculatorType.RETIREMENT]: {
        title: '은퇴 자금 계산기 | 행복한 노후 계획',
        description: '은퇴를 위해 충분히 저축하고 있습니까? 은퇴 계산기를 사용하여 은퇴 목표를 달성할 수 있는지 확인하세요. 시간에 따른 저축 증가를 예측합니다.',
        keywords: '은퇴 계산기, 은퇴 계획, 401k 계산기, IRA 계산기, 은퇴 저축, 연금 계산기, 노후 자금 목표, 은퇴하려면 얼마가 필요한가, 은퇴 자금 계산기, 은퇴 소득 계획',
        structuredData: createStructuredData('은퇴 자금 계산기', '은퇴 계산기를 사용하여 은퇴 목표를 달성할 수 있는지 확인하세요.', 'ko')
    },
    [CalculatorType.INFLATION]: {
        title: '인플레이션 계산기 | 돈의 미래 가치 확인',
        description: '인플레이션 효과를 고려하여 특정 금액의 미래 가치를 계산합니다. 시간에 따른 구매력에 대한 인플레이션의 영향을 이해하세요.',
        keywords: '인플레이션 계산기, 구매력, 돈의 가치, 소비자 물가 지수 계산기, 인플레이션율, 구매력 계산기, 화폐의 실질 가치, 생활비 계산기, 미래 화폐 가치, 경제 인플레이션',
        structuredData: createStructuredData('인플레이션 계산기', '인플레이션 효과를 고려하여 특정 금액의 미래 가치를 계산합니다.', 'ko')
    },
    [CalculatorType.TIP]: {
        title: '팁 계산기 | 신속하게 팁 계산 및 계산서 분할',
        description: '간단하고 빠른 팁 계산기. 청구서의 팁 금액을 계산하고 여러 사람과 나누어 1인당 총 금액을 확인하세요. 외식에 이상적입니다.',
        keywords: '팁 계산기, 계산서 분할, 봉사료 계산기, 레스토랑 팁, 팁 가이드, 서비스 팁 계산기, 팁 얼마, 더치페이 계산기',
        structuredData: createStructuredData('팁 계산기', '간단하고 빠른 팁 계산기. 청구서의 팁 금액을 계산하고 여러 사람과 나누어 보세요.', 'ko')
    },
    [CalculatorType.BREAK_EVEN]: {
        title: '손익분기점 계산기 | 귀하의 비즈니스를 위해',
        description: '비즈니스의 손익분기점을 찾으세요. 비용을 충당하기 위해 판매해야 하는 단위 수 또는 창출해야 하는 수익을 계산하세요. 사업 계획에 필수적입니다.',
        keywords: '손익분기점 계산기, 손익분기점 분석, 비즈니스 계산기, 고정 비용, 변동 비용, 수익 분석, BEP 계산기, 원가-조업도-이익 분석, 스타트업 계산기, 사업 수익성',
        structuredData: createStructuredData('손익분기점 계산기', '비즈니스의 손익분기점을 찾으세요.', 'ko')
    }
  },
  ja: {
    default: {
        title: 'ユニバーサル金融計算機 | 無料で正確なオンラインツール',
        description: '無料の多言語金融計算機で、複利、単利、貯蓄目標、ROIを計算します。あらゆる財務計画のニーズに使いやすいです。',
        keywords: '金融計算機, 利息計算機, 投資計算機, 貯蓄計算機, ROI計算機, 無料金融ツール, オンライン電卓, お金 計算, 財務計画ツール, 住宅ローン計算機, ローン計算機',
        structuredData: createStructuredData('ユニバーサル金融計算機', '複利、単利、貯蓄目標、ROIを計算する無料の多言語金融計算機。', 'ja')
    },
    [CalculatorType.COMPOUND_INTEREST]: {
        title: '複利計算機 | 将来価値の投資成長',
        description: '複利計算機で投資の将来価値を簡単に計算します。元本、利率、期間、拠出金で時間とともにどのようにお金が増えるかを確認してください。',
        keywords: '複利計算機, 将来価値計算機, 投資成長, 退職貯蓄, 財務計画, 貯蓄成長シミュレーター, 複利計算式, 投資リターン計算, 複利効果, 利息の利息',
        structuredData: createStructuredData('複利計算機', '複利計算機で投資の将来価値を簡単に計算します。', 'ja')
    },
    [CalculatorType.SIMPLE_INTEREST]: {
        title: '単利計算機 | 簡単なローン＆貯蓄計算',
        description: 'ローンや投資の単利を素早く計算します。元本、利率、期間を入力して、総利息と最終金額を求めます。簡単な金融ツールです。',
        keywords: '単利計算機, ローン利息, 貯蓄利息, 元本と利息, 簡単な利息計算, 固定金利計算, 単利ローン計算, 単利の計算方法, 利息の公式',
        structuredData: createStructuredData('単利計算機', 'ローンや投資の単利を素早く計算します。', 'ja')
    },
    [CalculatorType.SAVINGS_GOAL]: {
        title: '貯蓄目標計算機 | あなたの経済的な未来を計画する',
        description: '貯蓄目標を達成するために必要な毎月の拠出額を決定します。家、車、退職、または大きな買い物の計画に最適です。目標を設定して貯蓄を始めましょう。',
        keywords: '貯蓄目標計算機, 財務計画, 退職計算機, 毎月の貯蓄, 投資目標, 財産形成プランナー, 月々いくら貯める, 夢の貯金箱, 将来の貯蓄目標',
        structuredData: createStructuredData('貯蓄目標計算機', '貯蓄目標を達成するために必要な毎月の拠出額を決定します。', 'ja')
    },
    [CalculatorType.ROI]: {
        title: 'ROI計算機 | 投資収益率を計算する',
        description: '使いやすいROI計算機で投資の収益性を測定します。初期投資と最終価値を入力して、投資収益率と純利益を確認します。',
        keywords: 'ROI計算機, 投資収益率, 投資利益, 収益性分析, 財務指標, ROIの計算方法, 投資リターン, 利益計算, ビジネスROI, ROIとは',
        structuredData: createStructuredData('ROI計算機', '使いやすいROI計算機で投資の収益性を測定します。', 'ja')
    },
    [CalculatorType.LOAN]: {
      title: 'ローン＆住宅ローン計算機 | 月々の返済額を計算',
      description: '月々のローンまたは住宅ローンの返済額を見積もります。融資額、利率、期間を入力して、返済スケジュール、総利息、総返済額を確認します。',
      keywords: 'ローン計算機, 住宅ローン計算機, 月々の返済額計算機, 返済スケジュール, ローン返済, 自動車ローン計算, 個人向けローン, 返済シミュレーション, 金利計算',
      structuredData: createStructuredData('ローン＆住宅ローン計算機', '月々のローンまたは住宅ローンの返済額を見積もります。', 'ja')
    },
    [CalculatorType.RETIREMENT]: {
        title: '退職貯蓄計算機 | 黄金時代に備える',
        description: '退職のために十分に貯蓄していますか？退職計算機を使用して、退職目標を達成できるかどうかを確認してください。時間経過に伴う貯蓄の成長を予測します。',
        keywords: '退職計算機, 退職計画, 401k計算機, IRA計算機, 退職貯蓄, 年金計算, 老後資金 目標, 退職にはいくら必要か, 退職資金シミュレーター, 老後所得計画',
        structuredData: createStructuredData('退職貯蓄計算機', '退職計算機を使用して、退職目標を達成できるかどうかを確認してください。', 'ja')
    },
    [CalculatorType.INFLATION]: {
        title: 'インフレ計算機 | お金の未来価値を見る',
        description: 'インフレの影響を考慮して、特定のお金の未来価値を計算します。時間経過に伴う購買力へのインフレの影響を理解します。',
        keywords: 'インフレ計算機, 購買力, お金の価値, CPI計算機, インフレ率, 購買力計算, お金の本当の価値, 生活費計算, 将来のお金の価値, 経済インフレ',
        structuredData: createStructuredData('インフレ計算機', 'インフレの影響を考慮して、特定のお金の未来価値を計算します。', 'ja')
    },
    [CalculatorType.TIP]: {
        title: 'チップ計算機 | チップを素早く計算し、勘定を分割',
        description: 'シンプルで高速なチップ計算機。請求書のチップ額を計算し、複数人で分割して、一人当たりの合計金額を確認します。外食に最適です。',
        keywords: 'チップ計算機, 割り勘, チップ計算機, レストランのチップ, チップガイド, サービス料計算, チップはいくら, 割り勘アプリ',
        structuredData: createStructuredData('チップ計算機', 'シンプルで高速なチップ計算機。請求書のチップ額を計算し、複数人で分割します。', 'ja')
    },
    [CalculatorType.BREAK_EVEN]: {
        title: '損益分岐点計算機 | あなたのビジネスのために',
        description: 'あなたのビジネスの損益分岐点を見つけます。コストをカバーするために販売する必要のあるユニット数または生み出す必要のある収益を計算します。事業計画に不可欠です。',
        keywords: '損益分岐点計算機, 損益分岐点分析, ビジネス計算機, 固定費, 変動費, 利益分析, BEP計算機, CVP分析, スタートアップ計算機, 事業収益性',
        structuredData: createStructuredData('損益分岐点計算機', 'あなたのビジネスの損益分岐点を見つけます。', 'ja')
    }
  },
  zh: {
      default: {
          title: '通用金融计算器 | 免费准确的在线工具',
          description: '使用我们的免费多语言金融计算器计算复利、单利、储蓄目标和投资回报率。易于使用，满足您所有的财务规划需求。',
          keywords: '金融计算器, 利息计算器, 投资计算器, 储蓄计算器, ROI计算器, 免费金融工具, 在线计算器, 金钱计算器, 理财规划工具, 房贷计算器, 贷款计算器',
          structuredData: createStructuredData('通用金融计算器', '免费多语言金融计算器，计算复利、单利、储蓄目标和投资回报率。', 'zh')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: '复利计算器 | 未来价值投资增长',
          description: '使用我们的复利计算器轻松计算您投资的未来价值。了解您的资金如何随着本金、利率、时间和供款而增长。',
          keywords: '复利计算器, 未来价值计算器, 投资增长, 退休储蓄, 财务规划, 储蓄增长计算器, 计算复利, 投资回报计算器, 复利回报, 利滚利',
          structuredData: createStructuredData('复利计算器', '使用我们的复利计算器轻松计算您投资的未来价值。', 'zh')
      },
      [CalculatorType.SIMPLE_INTEREST]: {
          title: '单利计算器 | 简易贷款和储蓄计算',
          description: '快速计算贷款或投资的单利。输入本金、利率和时间，即可找到总利息和最终金额。一个直观的金融工具。',
          keywords: '单利计算器, 贷款利息, 储蓄利息, 本金和利息, 简易利息计算, 固定利率计算器, 单利贷款计算, 如何计算单利, 利息公式',
          structuredData: createStructuredData('单利计算器', '快速计算贷款或投资的单利。', 'zh')
      },
      [CalculatorType.SAVINGS_GOAL]: {
          title: '储蓄目标计算器 | 规划您的财务未来',
          description: '确定达到储蓄目标所需的每月供款。非常适合规划购房、购车、退休或任何重大采购。设定您的目标，开始储蓄。',
          keywords: '储蓄目标计算器, 财务规划, 退休计算器, 每月储蓄, 投资目标, 理财目标规划师, 每月存多少钱, 梦想储蓄计算器, 未来储蓄目标',
          structuredData: createStructuredData('储蓄目标计算器', '确定达到储蓄目标所需的每月供款。', 'zh')
      },
      [CalculatorType.ROI]: {
          title: 'ROI计算器 | 计算您的投资回报率',
          description: '使用我们易于使用的ROI计算器衡量投资的盈利能力。输入您的初始投资和最终价值，查看您的投资回报率百分比和净利润。',
          keywords: 'ROI计算器, 投资回报率, 投资利润, 盈利能力分析, 财务指标, 计算ROI, 投资回报, 利润计算器, 商业ROI, 什么是ROI',
          structuredData: createStructuredData('ROI计算器', '使用我们易于使用的ROI计算器衡量投资的盈利能力。', 'zh')
      },
      [CalculatorType.LOAN]: {
        title: '贷款和抵押计算器 | 计算每月还款额',
        description: '估算您的每月贷款或抵押还款额。输入贷款金额、利率和期限，以查找您的还款计划、总利息和总还款额。',
        keywords: '贷款计算器, 抵押计算器, 每月还款计算器, 还款计划, 贷款摊销, 汽车贷款计算器, 个人贷款计算器, 贷款还款时间表, 利率计算器',
        structuredData: createStructuredData('贷款和抵押计算器', '估算您的每月贷款或抵押还款额。', 'zh')
      },
      [CalculatorType.RETIREMENT]: {
          title: '退休储蓄计算器 | 规划您的黄金岁月',
          description: '您为退休储蓄了足够的钱吗？使用我们的退休计算器，看看您是否步入正轨以实现您的退休目标。预测您的储蓄随时间的增长。',
          keywords: '退休计算器, 退休规划, 401k计算器, IRA计算器, 退休储蓄, 养老金计算器, 养老金目标, 退休需要多少钱, 退休基金计算器, 退休收入规划',
          structuredData: createStructuredData('退休储蓄计算器', '使用我们的退休计算器，看看您是否步入正轨以实现您的退休目标。', 'zh')
      },
      [CalculatorType.INFLATION]: {
          title: '通货膨胀计算器 | 查看货币的未来价值',
          description: '考虑到通货膨胀的影响，计算一定数量货币的未来价值。了解通货膨胀对您购买力随时间的影响。',
          keywords: '通货膨胀计算器, 购买力, 货币价值, CPI计算器, 通货膨胀率, 购买力计算器, 货币的真实价值, 生活成本计算器, 未来货币价值, 经济通胀',
          structuredData: createStructuredData('通货膨胀计算器', '考虑到通货膨胀的影响，计算一定数量货币的未来价值。', 'zh')
      },
      [CalculatorType.TIP]: {
          title: '小费计算器 | 快速计算小费和分摊账单',
          description: '一个简单快速的小费计算器。计算账单的小费金额，在多个人之间分摊，并查看每人的总金额。非常适合外出就餐。',
          keywords: '小费计算器, 分摊账单, 小费计算器, 餐厅小费, 小费指南, 服务费计算器, 小费给多少, AA制计算器',
          structuredData: createStructuredData('小费计算器', '一个简单快速的小费计算器。计算账单的小费金额，在多个人之间分摊。', 'zh')
      },
      [CalculatorType.BREAK_EVEN]: {
          title: '盈亏平衡点计算器 | 为您的企业',
          description: '为您的企业找到盈亏平衡点。计算您需要销售多少单位或产生多少收入才能覆盖您的成本。对业务规划至关重要。',
          keywords: '盈亏平衡点计算器, 盈亏平衡分析, 商业计算器, 固定成本, 可变成本, 利润分析, BEP计算器, 成本-销量-利润分析, 创业计算器, 商业盈利能力',
          structuredData: createStructuredData('盈亏平衡点计算器', '为您的企业找到盈亏平衡点。', 'zh')
      }
  },
  es: {
      default: {
          title: 'Calculadora Financiera Universal | Herramienta Online Gratuita y Precisa',
          description: 'Calcule el interés compuesto, el interés simple, las metas de ahorro y el ROI con nuestra calculadora financiera gratuita y multilingüe. Fácil de usar para todas sus necesidades de planificación financiera.',
          keywords: 'calculadora financiera, calculadora de intereses, calculadora de inversiones, calculadora de ahorros, calculadora de ROI, herramientas financieras gratuitas, calculadora online, calculadora de dinero, herramientas de planificación financiera, calculadora de hipotecas, calculadora de préstamos',
          structuredData: createStructuredData('Calculadora Financiera Universal', 'Calcule el interés compuesto, el interés simple, las metas de ahorro y el ROI con nuestra calculadora financiera gratuita y multilingüe.', 'es')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Calculadora de Interés Compuesto | Crecimiento de la Inversión a Futuro',
          description: 'Calcule fácilmente el valor futuro de su inversión con nuestra calculadora de interés compuesto. Vea cómo su dinero puede crecer con el tiempo con el capital, la tasa de interés, el tiempo y las contribuciones.',
          keywords: 'calculadora de interés compuesto, calculadora de valor futuro, crecimiento de la inversión, ahorros para la jubilación, planificación financiera, calculadora de crecimiento de ahorros, calcular interés compuesto, calculadora de rendimiento de inversión, rendimientos compuestos, interés sobre interés',
          structuredData: createStructuredData('Calculadora de Interés Compuesto', 'Calcule fácilmente el valor futuro de su inversión con nuestra calculadora de interés compuesto.', 'es')
      },
      [CalculatorType.SIMPLE_INTEREST]: {
          title: 'Calculadora de Interés Simple | Cálculo Fácil de Préstamos y Ahorros',
          description: 'Calcule rápidamente el interés simple de préstamos o inversiones. Ingrese el capital, la tasa y el tiempo para encontrar el interés total y el monto final. Una herramienta financiera sencilla.',
          keywords: 'calculadora de interés simple, interés de préstamo, interés de ahorros, capital e interés, cálculo fácil de intereses, calculadora de interés fijo, calculadora de préstamo simple, cómo calcular el interés simple, fórmula de interés',
          structuredData: createStructuredData('Calculadora de Interés Simple', 'Calcule rápidamente el interés simple de préstamos o inversiones.', 'es')
      },
      [CalculatorType.SAVINGS_GOAL]: {
          title: 'Calculadora de Metas de Ahorro | Planifique su Futuro Financiero',
          description: 'Determine las contribuciones mensuales necesarias para alcanzar su meta de ahorro. Perfecto para planificar la compra de una casa, un automóvil, la jubilación o cualquier compra importante. Establezca su meta y comience a ahorrar.',
          keywords: 'calculadora de metas de ahorro, planificación financiera, calculadora de jubilación, ahorros mensuales, meta de inversión, planificador de metas financieras, cuánto ahorrar mensualmente, calculadora de ahorros para sueños, meta de ahorro futura',
          structuredData: createStructuredData('Calculadora de Metas de Ahorro', 'Determine las contribuciones mensuales necesarias para alcanzar su meta de ahorro.', 'es')
      },
      [CalculatorType.ROI]: {
          title: 'Calculadora de ROI | Calcule su Retorno de la Inversión',
          description: 'Mida la rentabilidad de una inversión con nuestra calculadora de ROI fácil de usar. Ingrese su inversión inicial y el valor final para ver su porcentaje de retorno de la inversión y la ganancia neta.',
          keywords: 'calculadora de ROI, retorno de la inversión, beneficio de la inversión, análisis de rentabilidad, métricas financieras, calcular ROI, rendimiento de la inversión, calculadora de ganancias, ROI empresarial, qué es el ROI',
          structuredData: createStructuredData('Calculadora de ROI', 'Mida la rentabilidad de una inversión con nuestra calculadora de ROI fácil de usar.', 'es')
      },
      [CalculatorType.LOAN]: {
        title: 'Calculadora de Préstamos e Hipotecas | Calcule los Pagos Mensuales',
        description: 'Estime sus pagos mensuales de préstamos o hipotecas. Ingrese el monto del préstamo, la tasa de interés y el plazo para encontrar su calendario de pagos, el interés total y el monto total de la devolución.',
        keywords: 'calculadora de préstamos, calculadora de hipotecas, calculadora de pagos mensuales, tabla de amortización, amortización de préstamos, calculadora de préstamos para automóviles, calculadora de préstamos personales, calendario de pagos de préstamos, calculadora de tasa de interés',
        structuredData: createStructuredData('Calculadora de Préstamos e Hipotecas', 'Estime sus pagos mensuales de préstamos o hipotecas.', 'es')
      },
      [CalculatorType.RETIREMENT]: {
          title: 'Calculadora de Ahorros para la Jubilación | Planifique sus Años Dorados',
          description: '¿Está ahorrando lo suficiente para la jubilación? Use nuestra calculadora de jubilación para ver si está en camino de cumplir sus metas de jubilación. Proyecte el crecimiento de sus ahorros a lo largo del tiempo.',
          keywords: 'calculadora de jubilación, planificación de la jubilación, calculadora 401k, calculadora IRA, ahorros para la jubilación, calculadora de pensión, meta de ahorros para el retiro, cuánto se necesita para jubilarse, calculadora de fondos de jubilación, planificación de ingresos para la jubilación',
          structuredData: createStructuredData('Calculadora de Ahorros para la Jubilación', 'Use nuestra calculadora de jubilación para ver si está en camino de cumplir sus metas de jubilación.', 'es')
      },
      [CalculatorType.INFLATION]: {
          title: 'Calculadora de Inflación | Vea el Valor Futuro del Dinero',
          description: 'Calcule el valor futuro de una cierta cantidad de dinero, considerando los efectos de la inflación. Comprenda el impacto de la inflación en su poder adquisitivo a lo largo del tiempo.',
          keywords: 'calculadora de inflación, poder adquisitivo, valor del dinero, calculadora de IPC, tasa de inflación, calculadora de poder de compra, valor real del dinero, calculadora de costo de vida, valor futuro del dinero, inflación económica',
          structuredData: createStructuredData('Calculadora de Inflación', 'Calcule el valor futuro de una cierta cantidad de dinero, considerando los efectos de la inflación.', 'es')
      },
      [CalculatorType.TIP]: {
          title: 'Calculadora de Propinas | Calcule Rápidamente Propinas y Divida Cuentas',
          description: 'Una calculadora de propinas simple y rápida. Calcule el monto de la propina para una cuenta, divídala entre varias personas y vea el monto total por persona. Ideal para salir a cenar.',
          keywords: 'calculadora de propinas, dividir la cuenta, calculadora de propinas, propina de restaurante, guía de propinas, calculadora de propinas de servicio, cuánto dar de propina, aplicación para dividir cuentas',
          structuredData: createStructuredData('Calculadora de Propinas', 'Una calculadora de propinas simple y rápida para calcular y dividir propinas.', 'es')
      },
      [CalculatorType.BREAK_EVEN]: {
          title: 'Calculadora de Punto de Equilibrio | Para su Negocio',
          description: 'Encuentre el punto de equilibrio para su negocio. Calcule cuántas unidades necesita vender o los ingresos que necesita generar para cubrir sus costos. Esencial para la planificación empresarial.',
          keywords: 'calculadora de punto de equilibrio, análisis de punto de equilibrio, calculadora de negocios, costos fijos, costos variables, análisis de ganancias, calculadora de BEP, análisis de costo-volumen-beneficio, calculadora para startups, rentabilidad empresarial',
          structuredData: createStructuredData('Calculadora de Punto de Equilibrio', 'Encuentre el punto de equilibrio para su negocio.', 'es')
      }
  },
  pt: {
      default: {
          title: 'Calculadora Financeira Universal | Ferramenta Online Gratuita e Precisa',
          description: 'Calcule juros compostos, juros simples, metas de poupança e ROI com nossa calculadora financeira gratuita e multilíngue. Fácil de usar para todas as suas necessidades de planejamento financeiro.',
          keywords: 'calculadora financeira, calculadora de juros, calculadora de investimentos, calculadora de poupança, calculadora de ROI, ferramentas financeiras gratuitas, calculadora online, calculadora de dinheiro, ferramentas de planejamento financeiro, calculadora de hipoteca, calculadora de empréstimo',
          structuredData: createStructuredData('Calculadora Financeira Universal', 'Calcule juros compostos, juros simples, metas de poupança e ROI com nossa calculadora financeira gratuita e multilíngue.', 'pt')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Calculadora de Juros Compostos | Crescimento do Investimento Futuro',
          description: 'Calcule facilmente o valor futuro do seu investimento com nossa calculadora de juros compostos. Veja como seu dinheiro pode crescer ao longo do tempo com principal, taxa de juros, tempo e contribuições.',
          keywords: 'calculadora de juros compostos, calculadora de valor futuro, crescimento de investimento, poupança para aposentadoria, planejamento financeiro, calculadora de crescimento de poupança, calcular juros compostos, calculadora de retorno de investimento, retornos compostos, juros sobre juros',
          structuredData: createStructuredData('Calculadora de Juros Compostos', 'Calcule facilmente o valor futuro do seu investimento com nossa calculadora de juros compostos.', 'pt')
      },
      [CalculatorType.SIMPLE_INTEREST]: {
          title: 'Calculadora de Juros Simples | Cálculo Fácil de Empréstimos e Poupanças',
          description: 'Calcule rapidamente os juros simples de empréstimos ou investimentos. Insira o principal, a taxa e o tempo para encontrar o juro total e o montante final. Uma ferramenta financeira direta.',
          keywords: 'calculadora de juros simples, juros de empréstimo, juros de poupança, principal e juros, cálculo fácil de juros, calculadora de juros fixos, calculadora de empréstimo simples, como calcular juros simples, fórmula de juros',
          structuredData: createStructuredData('Calculadora de Juros Simples', 'Calcule rapidamente os juros simples de empréstimos ou investimentos.', 'pt')
      },
      [CalculatorType.SAVINGS_GOAL]: {
          title: 'Calculadora de Metas de Poupança | Planeje seu Futuro Financeiro',
          description: 'Determine as contribuições mensais necessárias para atingir sua meta de poupança. Perfeito para planejar a compra de uma casa, carro, aposentadoria ou qualquer compra importante. Defina sua meta e comece a poupar.',
          keywords: 'calculadora de metas de poupança, planejamento financeiro, calculadora de aposentadoria, poupança mensal, meta de investimento, planejador de metas financeiras, quanto poupar por mês, calculadora de poupança dos sonhos, meta de poupança futura',
          structuredData: createStructuredData('Calculadora de Metas de Poupança', 'Determine as contribuições mensais necessárias para atingir sua meta de poupança.', 'pt')
      },
      [CalculatorType.ROI]: {
          title: 'Calculadora de ROI | Calcule seu Retorno sobre o Investimento',
          description: 'Meça a lucratividade de um investimento com nossa calculadora de ROI fácil de usar. Insira seu investimento inicial e o valor final para ver sua porcentagem de retorno sobre o investimento e o lucro líquido.',
          keywords: 'calculadora de ROI, retorno sobre o investimento, lucro do investimento, análise de lucratividade, métricas financeiras, calcular ROI, retorno do investimento, calculadora de lucro, ROI empresarial, o que é ROI',
          structuredData: createStructuredData('Calculadora de ROI', 'Meça a lucratividade de um investimento com nossa calculadora de ROI fácil de usar.', 'pt')
      },
      [CalculatorType.LOAN]: {
        title: 'Calculadora de Empréstimos e Hipotecas | Calcule os Pagamentos Mensais',
        description: 'Estime seus pagamentos mensais de empréstimos ou hipotecas. Insira o valor do empréstimo, a taxa de juros e o prazo para encontrar seu cronograma de pagamento, o total de juros e o valor total do reembolso.',
        keywords: 'calculadora de empréstimos, calculadora de hipotecas, calculadora de pagamentos mensais, tabela de amortização, amortização de empréstimos, calculadora de financiamento de veículos, calculadora de empréstimo pessoal, cronograma de pagamento de empréstimo, calculadora de taxa de juros',
        structuredData: createStructuredData('Calculadora de Empréstimos e Hipotecas', 'Estime seus pagamentos mensais de empréstimos ou hipotecas.', 'pt')
      },
      [CalculatorType.RETIREMENT]: {
          title: 'Calculadora de Poupança para Aposentadoria | Planeje seus Anos Dourados',
          description: 'Você está poupando o suficiente para a aposentadoria? Use nossa calculadora de aposentadoria para ver se você está no caminho certo para atingir suas metas de aposentadoria. Projete o crescimento de suas economias ao longo do tempo.',
          keywords: 'calculadora de aposentadoria, planejamento de aposentadoria, calculadora 401k, calculadora de previdência, poupança para aposentadoria, calculadora de pensão, meta de pé-de-meia, quanto precisa para se aposentar, calculadora de fundo de aposentadoria, planejamento de renda de aposentadoria',
          structuredData: createStructuredData('Calculadora de Poupança para Aposentadoria', 'Use nossa calculadora de aposentadoria para ver se você está no caminho certo para atingir suas metas.', 'pt')
      },
      [CalculatorType.INFLATION]: {
          title: 'Calculadora de Inflação | Veja o Valor Futuro do Dinheiro',
          description: 'Calcule o valor futuro de uma certa quantia de dinheiro, considerando os efeitos da inflação. Entenda o impacto da inflação em seu poder de compra ao longo do tempo.',
          keywords: 'calculadora de inflação, poder de compra, valor do dinheiro, calculadora de IPC, taxa de inflação, calculadora de poder de compra, valor real do dinheiro, calculadora de custo de vida, valor futuro do dinheiro, inflação econômica',
          structuredData: createStructuredData('Calculadora de Inflação', 'Calcule o valor futuro de uma certa quantia de dinheiro, considerando os efeitos da inflação.', 'pt')
      },
      [CalculatorType.TIP]: {
          title: 'Calculadora de Gorjetas | Calcule Gorjetas e Divida Contas Rapidamente',
          description: 'Uma calculadora de gorjetas simples e rápida. Calcule o valor da gorjeta para uma conta, divida-a entre várias pessoas e veja o valor total por pessoa. Ideal para jantares fora.',
          keywords: 'calculadora de gorjetas, dividir a conta, calculadora de serviço, gorjeta de restaurante, guia de gorjetas, calculadora de serviço, quanto dar de gorjeta, aplicativo para dividir a conta',
          structuredData: createStructuredData('Calculadora de Gorjetas', 'Uma calculadora de gorjetas simples e rápida para calcular e dividir gorjetas.', 'pt')
      },
      [CalculatorType.BREAK_EVEN]: {
          title: 'Calculadora de Ponto de Equilíbrio | Para o seu Negócio',
          description: 'Encontre o ponto de equilíbrio para o seu negócio. Calcule quantas unidades você precisa vender ou a receita que precisa gerar para cobrir seus custos. Essencial para o planejamento de negócios.',
          keywords: 'calculadora de ponto de equilíbrio, análise de ponto de equilíbrio, calculadora de negócios, custos fixos, custos variáveis, análise de lucro, calculadora de BEP, análise de custo-volume-lucro, calculadora para startups, lucratividade do negócio',
          structuredData: createStructuredData('Calculadora de Ponto de Equilíbrio', 'Encontre o ponto de equilíbrio para o seu negócio.', 'pt')
      }
  },
  th: {
      default: {
          title: 'เครื่องคำนวณทางการเงินสากล | เครื่องมือออนไลน์ฟรีและแม่นยำ',
          description: 'คำนวณดอกเบี้ยทบต้น, ดอกเบี้ยอย่างง่าย, เป้าหมายการออม และ ROI ด้วยเครื่องคำนวณทางการเงินหลายภาษาฟรีของเรา ใช้งานง่ายสำหรับทุกความต้องการในการวางแผนทางการเงินของคุณ',
          keywords: 'เครื่องคำนวณทางการเงิน, เครื่องคำนวณดอกเบี้ย, เครื่องคำนวณการลงทุน, เครื่องคำนวณการออม, เครื่องคำนวณ ROI, เครื่องมือทางการเงินฟรี, เครื่องคิดเลขออนไลน์, เครื่องคิดเลขเงิน, เครื่องมือวางแผนการเงิน, เครื่องคำนวณสินเชื่อบ้าน, เครื่องคำนวณสินเชื่อ',
          structuredData: createStructuredData('เครื่องคำนวณทางการเงินสากล', 'คำนวณดอกเบี้ยทบต้น, ดอกเบี้ยอย่างง่าย, เป้าหมายการออม และ ROI ด้วยเครื่องคำนวณทางการเงินหลายภาษาฟรีของเรา', 'th')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'เครื่องคำนวณดอกเบี้ยทบต้น | การเติบโตของการลงทุนในอนาคต',
          description: 'คำนวณมูลค่าในอนาคตของการลงทุนของคุณได้อย่างง่ายดายด้วยเครื่องคำนวณดอกเบี้ยทบต้นของเรา ดูว่าเงินของคุณจะเติบโตได้อย่างไรเมื่อเวลาผ่านไปด้วยเงินต้น, อัตราดอกเบี้ย, เวลา และเงินสมทบ',
          keywords: 'เครื่องคำนวณดอกเบี้ยทบต้น, เครื่องคำนวณมูลค่าในอนาคต, การเติบโตของการลงทุน, การออมเพื่อการเกษียณ, การวางแผนทางการเงิน, เครื่องคำนวณการเติบโตของเงินออม, คำนวณดอกเบี้ยทบต้น, เครื่องคำนวณผลตอบแทนการลงทุน, ผลตอบแทนทบต้น, ดอกเบี้ยของดอกเบี้ย',
          structuredData: createStructuredData('เครื่องคำนวณดอกเบี้ยทบต้น', 'คำนวณมูลค่าในอนาคตของการลงทุนของคุณได้อย่างง่ายดายด้วยเครื่องคำนวณดอกเบี้ยทบต้นของเรา', 'th')
      },
      [CalculatorType.SIMPLE_INTEREST]: {
          title: 'เครื่องคำนวณดอกเบี้ยอย่างง่าย | การคำนวณสินเชื่อและการออมที่ง่าย',
          description: 'คำนวณดอกเบี้ยอย่างง่ายสำหรับสินเชื่อหรือการลงทุนได้อย่างรวดเร็ว ป้อนเงินต้น, อัตรา และเวลาเพื่อค้นหาดอกเบี้ยทั้งหมดและจำนวนเงินสุดท้าย เครื่องมือทางการเงินที่ตรงไปตรงมา',
          keywords: 'เครื่องคำนวณดอกเบี้ยอย่างง่าย, ดอกเบี้ยเงินกู้, ดอกเบี้ยเงินออม, เงินต้นและดอกเบี้ย, การคำนวณดอกเบี้ยอย่างง่าย, เครื่องคำนวณดอกเบี้ยคงที่, เครื่องคำนวณสินเชื่อดอกเบี้ยต่ำ, วิธีคำนวณดอกเบี้ยอย่างง่าย, สูตรดอกเบี้ย',
          structuredData: createStructuredData('เครื่องคำนวณดอกเบี้ยอย่างง่าย', 'คำนวณดอกเบี้ยอย่างง่ายสำหรับสินเชื่อหรือการลงทุนได้อย่างรวดเร็ว', 'th')
      },
      [CalculatorType.SAVINGS_GOAL]: {
          title: 'เครื่องคำนวณเป้าหมายการออม | วางแผนอนาคตทางการเงินของคุณ',
          description: 'กำหนดเงินสมทบรายเดือนที่จำเป็นในการบรรลุเป้าหมายการออมของคุณ เหมาะสำหรับการวางแผนซื้อบ้าน, รถ, การเกษียณอายุ หรือการซื้อที่สำคัญใดๆ กำหนดเป้าหมายของคุณและเริ่มออม',
          keywords: 'เครื่องคำนวณเป้าหมายการออม, การวางแผนทางการเงิน, เครื่องคำนวณการเกษียณอายุ, การออมรายเดือน, เป้าหมายการลงทุน, ผู้วางแผนเป้าหมายทางการเงิน, ต้องออมเงินเดือนละเท่าไหร่, เครื่องคำนวณการออมเพื่อความฝัน, เป้าหมายการออมในอนาคต',
          structuredData: createStructuredData('เครื่องคำนวณเป้าหมายการออม', 'กำหนดเงินสมทบรายเดือนที่จำเป็นในการบรรลุเป้าหมายการออมของคุณ', 'th')
      },
      [CalculatorType.ROI]: {
          title: 'เครื่องคำนวณ ROI | คำนวณผลตอบแทนจากการลงทุนของคุณ',
          description: 'วัดความสามารถในการทำกำไรของการลงทุนด้วยเครื่องคำนวณ ROI ที่ใช้งานง่ายของเรา ป้อนการลงทุนเริ่มต้นและมูลค่าสุดท้ายของคุณเพื่อดูเปอร์เซ็นต์ผลตอบแทนจากการลงทุนและกำไรสุทธิ',
          keywords: 'เครื่องคำนวณ ROI, ผลตอบแทนจากการลงทุน, กำไรจากการลงทุน, การวิเคราะห์ความสามารถในการทำกำไร, ตัวชี้วัดทางการเงิน, คำนวณ ROI, ผลตอบแทนการลงทุน, เครื่องคำนวณกำไร, ROI ธุรกิจ, ROI คืออะไร',
          structuredData: createStructuredData('เครื่องคำนวณ ROI', 'วัดความสามารถในการทำกำไรของการลงทุนด้วยเครื่องคำนวณ ROI ที่ใช้งานง่ายของเรา', 'th')
      },
      [CalculatorType.LOAN]: {
        title: 'เครื่องคำนวณสินเชื่อและจำนอง | คำนวณการผ่อนชำระรายเดือน',
        description: 'ประเมินการผ่อนชำระสินเชื่อหรือจำนองรายเดือนของคุณ ป้อนจำนวนเงินกู้, อัตราดอกเบี้ย และระยะเวลาเพื่อค้นหาตารางการชำระเงิน, ดอกเบี้ยทั้งหมด และจำนวนเงินที่ต้องชำระคืนทั้งหมด',
        keywords: 'เครื่องคำนวณสินเชื่อ, เครื่องคำนวณจำนอง, เครื่องคำนวณการผ่อนชำระรายเดือน, ตารางการผ่อนชำระ, การผ่อนชำระสินเชื่อ, เครื่องคำนวณสินเชื่อรถยนต์, เครื่องคำนวณสินเชื่อส่วนบุคคล, ตารางการชำระหนี้, เครื่องคำนวณอัตราดอกเบี้ย',
        structuredData: createStructuredData('เครื่องคำนวณสินเชื่อและจำนอง', 'ประเมินการผ่อนชำระสินเชื่อหรือจำนองรายเดือนของคุณ', 'th')
      },
      [CalculatorType.RETIREMENT]: {
          title: 'เครื่องคำนวณการออมเพื่อการเกษียณ | วางแผนสำหรับปีทองของคุณ',
          description: 'คุณออมเงินเพื่อการเกษียณเพียงพอหรือไม่? ใช้เครื่องคำนวณการเกษียณของเราเพื่อดูว่าคุณอยู่ในเส้นทางที่จะบรรลุเป้าหมายการเกษียณของคุณหรือไม่ คาดการณ์การเติบโตของการออมของคุณเมื่อเวลาผ่านไป',
          keywords: 'เครื่องคำนวณการเกษียณ, การวางแผนการเกษียณ, เครื่องคำนวณ 401k, เครื่องคำนวณ IRA, การออมเพื่อการเกษียณ, เครื่องคำนวณบำนาญ, เป้าหมายเงินเก็บ, ต้องมีเงินเท่าไหร่ถึงจะเกษียณ, เครื่องคำนวณกองทุนเกษียณ, การวางแผนรายได้หลังเกษียณ',
          structuredData: createStructuredData('เครื่องคำนวณการออมเพื่อการเกษียณ', 'ใช้เครื่องคำนวณการเกษียณของเราเพื่อดูว่าคุณอยู่ในเส้นทางที่จะบรรลุเป้าหมายการเกษียณของคุณหรือไม่', 'th')
      },
      [CalculatorType.INFLATION]: {
          title: 'เครื่องคำนวณเงินเฟ้อ | ดูมูลค่าในอนาคตของเงิน',
          description: 'คำนวณมูลค่าในอนาคตของเงินจำนวนหนึ่ง โดยพิจารณาถึงผลกระทบของเงินเฟ้อ ทำความเข้าใจผลกระทบของเงินเฟ้อต่อกำลังซื้อของคุณเมื่อเวลาผ่านไป',
          keywords: 'เครื่องคำนวณเงินเฟ้อ, กำลังซื้อ, มูลค่าของเงิน, เครื่องคำนวณ CPI, อัตราเงินเฟ้อ, เครื่องคำนวณอำนาจซื้อ, มูลค่าที่แท้จริงของเงิน, เครื่องคำนวณค่าครองชีพ, มูลค่าเงินในอนาคต, ภาวะเงินเฟ้อทางเศรษฐกิจ',
          structuredData: createStructuredData('เครื่องคำนวณเงินเฟ้อ', 'คำนวณมูลค่าในอนาคตของเงินจำนวนหนึ่ง โดยพิจารณาถึงผลกระทบของเงินเฟ้อ', 'th')
      },
      [CalculatorType.TIP]: {
          title: 'เครื่องคำนวณทิป | คำนวณทิปและหารบิลอย่างรวดเร็ว',
          description: 'เครื่องคำนวณทิปที่ง่ายและรวดเร็ว คำนวณจำนวนทิปสำหรับบิล, หารบิลระหว่างหลายคน และดูจำนวนเงินทั้งหมดต่อคน เหมาะสำหรับการรับประทานอาหารนอกบ้าน',
          keywords: 'เครื่องคำนวณทิป, หารบิล, เครื่องคำนวณทิป, ทิปร้านอาหาร, คู่มือการให้ทิป, เครื่องคำนวณค่าบริการ, ควรให้ทิปเท่าไหร่, แอพหารบิล',
          structuredData: createStructuredData('เครื่องคำนวณทิป', 'เครื่องคำนวณทิปที่ง่ายและรวดเร็ว คำนวณจำนวนทิปสำหรับบิลและหารบิล', 'th')
      },
      [CalculatorType.BREAK_EVEN]: {
          title: 'เครื่องคำนวณจุดคุ้มทุน | สำหรับธุรกิจของคุณ',
          description: 'ค้นหาจุดคุ้มทุนสำหรับธุรกิจของคุณ คำนวณจำนวนหน่วยที่คุณต้องขายหรือรายได้ที่คุณต้องสร้างขึ้นเพื่อครอบคลุมค่าใช้จ่ายของคุณ จำเป็นสำหรับการวางแผนธุรกิจ',
          keywords: 'เครื่องคำนวณจุดคุ้มทุน, การวิเคราะห์จุดคุ้มทุน, เครื่องคำนวณธุรกิจ, ต้นทุนคงที่, ต้นทุนผันแปร, การวิเคราะห์กำไร, เครื่องคำนวณ BEP, การวิเคราะห์ต้นทุน-ปริมาณ-กำไร, เครื่องคำนวณสำหรับสตาร์ทอัพ, ความสามารถในการทำกำไรของธุรกิจ',
          structuredData: createStructuredData('เครื่องคำนวณจุดคุ้มทุน', 'ค้นหาจุดคุ้มทุนสำหรับธุรกิจของคุณ', 'th')
      }
  },
  vi: {
      default: {
          title: 'Máy tính Tài chính Đa năng | Công cụ Trực tuyến Miễn phí và Chính xác',
          description: 'Tính lãi kép, lãi đơn, mục tiêu tiết kiệm và ROI với máy tính tài chính đa ngôn ngữ miễn phí của chúng tôi. Dễ sử dụng cho mọi nhu cầu lập kế hoạch tài chính của bạn.',
          keywords: 'máy tính tài chính, máy tính lãi suất, máy tính đầu tư, máy tính tiết kiệm, máy tính ROI, công cụ tài chính miễn phí, máy tính trực tuyến, máy tính tiền, công cụ lập kế hoạch tài chính, máy tính thế chấp, máy tính khoản vay',
          structuredData: createStructuredData('Máy tính Tài chính Đa năng', 'Tính lãi kép, lãi đơn, mục tiêu tiết kiệm và ROI với máy tính tài chính đa ngôn ngữ miễn phí của chúng tôi.', 'vi')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Máy tính Lãi kép | Tăng trưởng Đầu tư Giá trị Tương lai',
          description: 'Dễ dàng tính toán giá trị tương lai của khoản đầu tư của bạn với máy tính lãi kép của chúng tôi. Xem tiền của bạn có thể tăng trưởng như thế nào theo thời gian với tiền gốc, lãi suất, thời gian và các khoản đóng góp.',
          keywords: 'máy tính lãi kép, máy tính giá trị tương lai, tăng trưởng đầu tư, tiết kiệm hưu trí, lập kế hoạch tài chính, máy tính tăng trưởng tiết kiệm, tính lãi kép, máy tính lợi tức đầu tư, lợi nhuận kép, lãi chồng lãi',
          structuredData: createStructuredData('Máy tính Lãi kép', 'Dễ dàng tính toán giá trị tương lai của khoản đầu tư của bạn với máy tính lãi kép của chúng tôi.', 'vi')
      },
      [CalculatorType.SIMPLE_INTEREST]: {
          title: 'Máy tính Lãi đơn | Tính toán Khoản vay & Tiết kiệm Dễ dàng',
          description: 'Nhanh chóng tính lãi đơn cho các khoản vay hoặc đầu tư. Nhập tiền gốc, lãi suất và thời gian để tìm tổng lãi và số tiền cuối cùng. Một công cụ tài chính đơn giản.',
          keywords: 'máy tính lãi đơn, lãi vay, lãi tiết kiệm, gốc và lãi, tính lãi dễ dàng, máy tính lãi suất cố định, máy tính vay lãi đơn, cách tính lãi đơn, công thức tính lãi',
          structuredData: createStructuredData('Máy tính Lãi đơn', 'Nhanh chóng tính lãi đơn cho các khoản vay hoặc đầu tư.', 'vi')
      },
      [CalculatorType.SAVINGS_GOAL]: {
          title: 'Máy tính Mục tiêu Tiết kiệm | Lên kế hoạch cho Tương lai Tài chính của Bạn',
          description: 'Xác định các khoản đóng góp hàng tháng cần thiết để đạt được mục tiêu tiết kiệm của bạn. Hoàn hảo để lập kế hoạch mua nhà, xe hơi, nghỉ hưu hoặc bất kỳ giao dịch mua lớn nào. Đặt mục tiêu của bạn và bắt đầu tiết kiệm.',
          keywords: 'máy tính mục tiêu tiết kiệm, lập kế hoạch tài chính, máy tính nghỉ hưu, tiết kiệm hàng tháng, mục tiêu đầu tư, người lập kế hoạch mục tiêu tài chính, cần tiết kiệm bao nhiêu mỗi tháng, máy tính tiết kiệm ước mơ, mục tiêu tiết kiệm trong tương lai',
          structuredData: createStructuredData('Máy tính Mục tiêu Tiết kiệm', 'Xác định các khoản đóng góp hàng tháng cần thiết để đạt được mục tiêu tiết kiệm của bạn.', 'vi')
      },
      [CalculatorType.ROI]: {
          title: 'Máy tính ROI | Tính toán Lợi tức Đầu tư của Bạn',
          description: 'Đo lường lợi nhuận của một khoản đầu tư với máy tính ROI dễ sử dụng của chúng tôi. Nhập vốn đầu tư ban đầu và giá trị cuối cùng để xem tỷ suất hoàn vốn và lợi nhuận ròng của bạn.',
          keywords: 'máy tính ROI, lợi tức đầu tư, lợi nhuận đầu tư, phân tích lợi nhuận, chỉ số tài chính, tính toán ROI, lợi nhuận đầu tư, máy tính lợi nhuận, ROI doanh nghiệp, ROI là gì',
          structuredData: createStructuredData('Máy tính ROI', 'Đo lường lợi nhuận của một khoản đầu tư với máy tính ROI dễ sử dụng của chúng tôi.', 'vi')
      },
      [CalculatorType.LOAN]: {
        title: 'Máy tính Khoản vay & Thế chấp | Tính toán các Khoản thanh toán Hàng tháng',
        description: 'Ước tính các khoản thanh toán khoản vay hoặc thế chấp hàng tháng của bạn. Nhập số tiền vay, lãi suất và thời hạn để tìm lịch thanh toán, tổng lãi và tổng số tiền hoàn trả.',
        keywords: 'máy tính khoản vay, máy tính thế chấp, máy tính thanh toán hàng tháng, lịch trả nợ, trả nợ khoản vay, máy tính vay mua ô tô, máy tính vay cá nhân, lịch thanh toán khoản vay, máy tính lãi suất',
        structuredData: createStructuredData('Máy tính Khoản vay & Thế chấp', 'Ước tính các khoản thanh toán khoản vay hoặc thế chấp hàng tháng của bạn.', 'vi')
      },
      [CalculatorType.RETIREMENT]: {
          title: 'Máy tính Tiết kiệm Hưu trí | Lên kế hoạch cho những năm vàng của bạn',
          description: 'Bạn có tiết kiệm đủ cho nghỉ hưu không? Sử dụng máy tính nghỉ hưu của chúng tôi để xem bạn có đang đi đúng hướng để đạt được mục tiêu nghỉ hưu của mình không. Dự báo sự tăng trưởng tiết kiệm của bạn theo thời gian.',
          keywords: 'máy tính nghỉ hưu, lập kế hoạch nghỉ hưu, máy tính 401k, máy tính IRA, tiết kiệm hưu trí, máy tính lương hưu, mục tiêu quỹ hưu trí, cần bao nhiêu tiền để nghỉ hưu, máy tính quỹ hưu trí, lập kế hoạch thu nhập hưu trí',
          structuredData: createStructuredData('Máy tính Tiết kiệm Hưu trí', 'Sử dụng máy tính nghỉ hưu của chúng tôi để xem bạn có đang đi đúng hướng để đạt được mục tiêu nghỉ hưu của mình không.', 'vi')
      },
      [CalculatorType.INFLATION]: {
          title: 'Máy tính Lạm phát | Xem Giá trị Tương lai của Tiền',
          description: 'Tính toán giá trị tương lai của một số tiền nhất định, có tính đến tác động của lạm phát. Hiểu tác động của lạm phát đối với sức mua của bạn theo thời gian.',
          keywords: 'máy tính lạm phát, sức mua, giá trị của tiền, máy tính CPI, tỷ lệ lạm phát, máy tính sức mua, giá trị thực của tiền, máy tính chi phí sinh hoạt, giá trị tiền tệ trong tương lai, lạm phát kinh tế',
          structuredData: createStructuredData('Máy tính Lạm phát', 'Tính toán giá trị tương lai của một số tiền nhất định, có tính đến tác động của lạm phát.', 'vi')
      },
      [CalculatorType.TIP]: {
          title: 'Máy tính Tiền boa | Nhanh chóng Tính toán Tiền boa và Chia hóa đơn',
          description: 'Một máy tính tiền boa đơn giản và nhanh chóng. Tính số tiền boa cho một hóa đơn, chia cho nhiều người và xem tổng số tiền mỗi người. Lý tưởng cho việc đi ăn ngoài.',
          keywords: 'máy tính tiền boa, chia hóa đơn, máy tính tiền boa, tiền boa nhà hàng, hướng dẫn tiền boa, máy tính phí dịch vụ, nên boa bao nhiêu, ứng dụng chia hóa đơn',
          structuredData: createStructuredData('Máy tính Tiền boa', 'Một máy tính tiền boa đơn giản và nhanh chóng để tính toán tiền boa và chia hóa đơn.', 'vi')
      },
      [CalculatorType.BREAK_EVEN]: {
          title: 'Máy tính Điểm hòa vốn | Cho Doanh nghiệp của bạn',
          description: 'Tìm điểm hòa vốn cho doanh nghiệp của bạn. Tính toán bạn cần bán bao nhiêu đơn vị hoặc doanh thu bạn cần tạo ra để trang trải chi phí. Cần thiết cho việc lập kế hoạch kinh doanh.',
          keywords: 'máy tính điểm hòa vốn, phân tích điểm hòa vốn, máy tính kinh doanh, chi phí cố định, chi phí biến đổi, phân tích lợi nhuận, máy tính BEP, phân tích chi phí-sản lượng-lợi nhuận, máy tính khởi nghiệp, khả năng sinh lời của doanh nghiệp',
          structuredData: createStructuredData('Máy tính Điểm hòa vốn', 'Tìm điểm hòa vốn cho doanh nghiệp của bạn.', 'vi')
      }
  },
  sv: {
      default: {
          title: 'Universell Finanskalkylator | Gratis & Noggrann Online-verktyg',
          description: 'Beräkna ränta på ränta, enkel ränta, sparmål och ROI med vår gratis flerspråkiga finanskalkylator. Lätt att använda för alla dina behov av ekonomisk planering.',
          keywords: 'finanskalkylator, räntekalkylator, investeringskalkylator, sparkalkylator, ROI-kalkylator, gratis finansiella verktyg, online-kalkylator, penningkalkylator, verktyg för finansiell planering, bolånekalkylator, lånekalkylator',
          structuredData: createStructuredData('Universell Finanskalkylator', 'En omfattande finanskalkylator som stöder ränta på ränta, enkel ränta, sparmål och ROI-beräkningar.', 'sv')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Räntekalkylator | Framtida värde investeringstillväxt',
          description: 'Beräkna enkelt det framtida värdet av din investering med vår räntekalkylator. Se hur dina pengar kan växa över tid med huvudbelopp, ränta, tid och insättningar.',
          keywords: 'räntekalkylator, framtida värdekalkylator, investeringstillväxt, pensionssparande, finansiell planering, sparkalkylator, beräkna ränta på ränta, investeringsavkastning, sammansatt avkastning',
          structuredData: createStructuredData('Räntekalkylator', 'Beräkna enkelt det framtida värdet av din investering.', 'sv')
      }
  },
  bn: {
      default: {
          title: 'সার্বজনীন আর্থিক ক্যালকুলেটর | বিনামূল্যে ও নির্ভুল অনলাইন টুল',
          description: 'আমাদের বিনামূল্যে বহুভাষিক আর্থিক ক্যালকুলেটর দিয়ে চক্রবৃদ্ধি সুদ, সরল সুদ, সঞ্চয় লক্ষ্য এবং ROI গণনা করুন। আপনার সমস্ত আর্থিক পরিকল্পনার প্রয়োজনে ব্যবহার করা সহজ।',
          keywords: 'আর্থিক ক্যালকুলেটর, সুদ ক্যালকুলেটর, বিনিয়োগ ক্যালকুলেটর, সঞ্চয় ক্যালকুলেটর, ROI ক্যালকুলেটর, বিনামূল্যে আর্থিক সরঞ্জাম, অনলাইন ক্যালকুলেটর, আর্থিক পরিকল্পনা সরঞ্জাম, বন্ধকী ক্যালকুলেটর, ঋণ ক্যালকুলেটর',
          structuredData: createStructuredData('সার্বজনীন আর্থিক ক্যালকুলেটর', 'চক্রবৃদ্ধি সুদ, সরল সুদ, সঞ্চয় লক্ষ্য এবং ROI গণনা সমর্থনকারী একটি বিস্তৃত আর্থিক ক্যালকুলেটর।', 'bn')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'চক্রবৃদ্ধি সুদ ক্যালকুলেটর | ভবিষ্যত মূল্য বিনিয়োগ বৃদ্ধি',
          description: 'আমাদের চক্রবৃদ্ধি সুদ ক্যালকুলেটর দিয়ে আপনার বিনিয়োগের ভবিষ্যত মূল্য সহজেই গণনা করুন। মূল পরিমাণ, সুদের হার, সময় এবং অবদানের সাথে আপনার অর্থ কীভাবে বাড়তে পারে তা দেখুন।',
          keywords: 'চক্রবৃদ্ধি সুদ ক্যালকুলেটর, ভবিষ্যত মূল্য ক্যালকুলেটর, বিনিয়োগ বৃদ্ধি, অবসর সঞ্চয়, আর্থিক পরিকল্পনা, সঞ্চয় বৃদ্ধি ক্যালকুলেটর, চক্রবৃদ্ধি সুদ গণনা',
          structuredData: createStructuredData('চক্রবৃদ্ধি সুদ ক্যালকুলেটর', 'আপনার বিনিয়োগের ভবিষ্যত মূল্য সহজেই গণনা করুন।', 'bn')
      }
  },
  fr: {
      default: {
          title: 'Calculateur Financier Universel | Outil en ligne gratuit et précis',
          description: 'Calculez les intérêts composés, les intérêts simples, les objectifs d\'épargne et le ROI avec notre calculateur financier multilingue gratuit.',
          keywords: 'calculateur financier, calculateur d\'intérêts, calculateur d\'investissement, calculateur d\'épargne, calculateur ROI, outils financiers gratuits, calculateur en ligne, calculateur d\'argent',
          structuredData: createStructuredData('Calculateur Financier Universel', 'Un calculateur financier complet supportant les intérêts composés, les intérêts simples, les objectifs d\'épargne et les calculs de ROI.', 'fr')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Calculateur d\'Intérêts Composés | Croissance future de l\'investissement',
          description: 'Calculez facilement la valeur future de votre investissement avec notre calculateur d\'intérêts composés.',
          keywords: 'calculateur intérêts composés, calculateur valeur future, croissance investissement, épargne retraite, planification financière',
          structuredData: createStructuredData('Calculateur d\'Intérêts Composés', 'Calculez la valeur future de votre investissement.', 'fr')
      }
  },
  de: {
      default: {
          title: 'Universeller Finanzrechner | Kostenloses & präzises Online-Tool',
          description: 'Berechnen Sie Zinseszins, einfache Zinsen, Sparziele und ROI mit unserem kostenlosen mehrsprachigen Finanzrechner.',
          keywords: 'Finanzrechner, Zinsrechner, Investitionsrechner, Sparrechner, ROI-Rechner, kostenlose Finanztools, Online-Rechner, Geldrechner',
          structuredData: createStructuredData('Universeller Finanzrechner', 'Ein umfassender Finanzrechner für Zinseszins, einfache Zinsen, Sparziele und ROI-Berechnungen.', 'de')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Zinseszinsrechner | Zukünftiger Wert Investitionswachstum',
          description: 'Berechnen Sie einfach den zukünftigen Wert Ihrer Investition mit unserem Zinseszinsrechner.',
          keywords: 'Zinseszinsrechner, Zukunftswertrechner, Investitionswachstum, Altersvorsorge, Finanzplanung',
          structuredData: createStructuredData('Zinseszinsrechner', 'Berechnen Sie den zukünftigen Wert Ihrer Investition.', 'de')
      }
  },
  it: {
      default: {
          title: 'Calcolatore Finanziario Universale | Strumento online gratuito e preciso',
          description: 'Calcola interesse composto, interesse semplice, obiettivi di risparmio e ROI con il nostro calcolatore finanziario multilingue gratuito.',
          keywords: 'calcolatore finanziario, calcolatore interessi, calcolatore investimenti, calcolatore risparmi, calcolatore ROI, strumenti finanziari gratuiti',
          structuredData: createStructuredData('Calcolatore Finanziario Universale', 'Un calcolatore finanziario completo per interesse composto, interesse semplice, obiettivi di risparmio e calcoli ROI.', 'it')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Calcolatore Interesse Composto | Crescita futura degli investimenti',
          description: 'Calcola facilmente il valore futuro del tuo investimento con il nostro calcolatore di interesse composto.',
          keywords: 'calcolatore interesse composto, calcolatore valore futuro, crescita investimenti, risparmio pensionistico, pianificazione finanziaria',
          structuredData: createStructuredData('Calcolatore Interesse Composto', 'Calcola il valore futuro del tuo investimento.', 'it')
      }
  },
  ru: {
      default: {
          title: 'Универсальный Финансовый Калькулятор | Бесплатный и точный онлайн-инструмент',
          description: 'Рассчитайте сложные проценты, простые проценты, цели сбережений и ROI с нашим бесплатным многоязычным финансовым калькулятором.',
          keywords: 'финансовый калькулятор, калькулятор процентов, инвестиционный калькулятор, калькулятор сбережений, калькулятор ROI, бесплатные финансовые инструменты',
          structuredData: createStructuredData('Универсальный Финансовый Калькулятор', 'Комплексный финансовый калькулятор для сложных процентов, простых процентов, целей сбережений и расчетов ROI.', 'ru')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Калькулятор Сложных Процентов | Будущая стоимость роста инвестиций',
          description: 'Легко рассчитайте будущую стоимость ваших инвестиций с нашим калькулятором сложных процентов.',
          keywords: 'калькулятор сложных процентов, калькулятор будущей стоимости, рост инвестиций, пенсионные сбережения, финансовое планирование',
          structuredData: createStructuredData('Калькулятор Сложных Процентов', 'Рассчитайте будущую стоимость ваших инвестиций.', 'ru')
      }
  },
  ar: {
      default: {
          title: 'حاسبة مالية شاملة | أداة مجانية ودقيقة عبر الإنترنت',
          description: 'احسب الفائدة المركبة والفائدة البسيطة وأهداف الادخار والعائد على الاستثمار باستخدام حاسبتنا المالية المجانية متعددة اللغات.',
          keywords: 'حاسبة مالية، حاسبة الفائدة، حاسبة الاستثمار، حاسبة الادخار، حاسبة ROI، أدوات مالية مجانية، حاسبة عبر الإنترنت',
          structuredData: createStructuredData('حاسبة مالية شاملة', 'حاسبة مالية شاملة تدعم الفائدة المركبة والفائدة البسيطة وأهداف الادخار وحسابات العائد على الاستثمار.', 'ar')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'حاسبة الفائدة المركبة | نمو القيمة المستقبلية للاستثمار',
          description: 'احسب بسهولة القيمة المستقبلية لاستثمارك باستخدام حاسبة الفائدة المركبة.',
          keywords: 'حاسبة الفائدة المركبة، حاسبة القيمة المستقبلية، نمو الاستثمار، مدخرات التقاعد، التخطيط المالي',
          structuredData: createStructuredData('حاسبة الفائدة المركبة', 'احسب القيمة المستقبلية لاستثمارك.', 'ar')
      }
  },
  hi: {
      default: {
          title: 'यूनिवर्सल वित्तीय कैलकुलेटर | मुफ्त और सटीक ऑनलाइन टूल',
          description: 'हमारे मुफ्त बहुभाषी वित्तीय कैलकुलेटर से चक्रवृद्धि ब्याज, साधारण ब्याज, बचत लक्ष्य और ROI की गणना करें।',
          keywords: 'वित्तीय कैलकुलेटर, ब्याज कैलकुलेटर, निवेश कैलकुलेटर, बचत कैलकुलेटर, ROI कैलकुलेटर, मुफ्त वित्तीय उपकरण',
          structuredData: createStructuredData('यूनिवर्सल वित्तीय कैलकुलेटर', 'एक व्यापक वित्तीय कैलकुलेटर जो चक्रवृद्धि ब्याज, साधारण ब्याज, बचत लक्ष्य और ROI गणना का समर्थन करता है।', 'hi')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'चक्रवृद्धि ब्याज कैलकुलेटर | भविष्य मूल्य निवेश वृद्धि',
          description: 'हमारे चक्रवृद्धि ब्याज कैलकुलेटर से अपने निवेश के भविष्य मूल्य की आसानी से गणना करें।',
          keywords: 'चक्रवृद्धि ब्याज कैलकुलेटर, भविष्य मूल्य कैलकुलेटर, निवेश वृद्धि, सेवानिवृत्ति बचत, वित्तीय योजना',
          structuredData: createStructuredData('चक्रवृद्धि ब्याज कैलकुलेटर', 'अपने निवेश के भविष्य मूल्य की गणना करें।', 'hi')
      }
  },
  id: {
      default: {
          title: 'Kalkulator Keuangan Universal | Alat Online Gratis & Akurat',
          description: 'Hitung bunga majemuk, bunga sederhana, target tabungan, dan ROI dengan kalkulator keuangan multibahasa gratis kami.',
          keywords: 'kalkulator keuangan, kalkulator bunga, kalkulator investasi, kalkulator tabungan, kalkulator ROI, alat keuangan gratis',
          structuredData: createStructuredData('Kalkulator Keuangan Universal', 'Kalkulator keuangan komprehensif yang mendukung bunga majemuk, bunga sederhana, target tabungan, dan perhitungan ROI.', 'id')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Kalkulator Bunga Majemuk | Pertumbuhan Nilai Masa Depan Investasi',
          description: 'Hitung dengan mudah nilai masa depan investasi Anda dengan kalkulator bunga majemuk kami.',
          keywords: 'kalkulator bunga majemuk, kalkulator nilai masa depan, pertumbuhan investasi, tabungan pensiun, perencanaan keuangan',
          structuredData: createStructuredData('Kalkulator Bunga Majemuk', 'Hitung nilai masa depan investasi Anda.', 'id')
      }
  },
  nl: {
      default: {
          title: 'Universele Financiële Calculator | Gratis & Nauwkeurige Online Tool',
          description: 'Bereken samengestelde rente, enkelvoudige rente, spaardoelen en ROI met onze gratis meertalige financiële calculator.',
          keywords: 'financiële calculator, rentecalculator, investeringscalculator, spaarcalculator, ROI-calculator, gratis financiële tools',
          structuredData: createStructuredData('Universele Financiële Calculator', 'Een uitgebreide financiële calculator die samengestelde rente, enkelvoudige rente, spaardoelen en ROI-berekeningen ondersteunt.', 'nl')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Samengestelde Rente Calculator | Toekomstige Waarde Investeringsgroei',
          description: 'Bereken eenvoudig de toekomstige waarde van uw investering met onze samengestelde rente calculator.',
          keywords: 'samengestelde rente calculator, toekomstige waarde calculator, investeringsgroei, pensioensparen, financiële planning',
          structuredData: createStructuredData('Samengestelde Rente Calculator', 'Bereken de toekomstige waarde van uw investering.', 'nl')
      }
  },
  tr: {
      default: {
          title: 'Evrensel Finansal Hesap Makinesi | Ücretsiz ve Doğru Çevrimiçi Araç',
          description: 'Ücretsiz çok dilli finansal hesap makinemizle bileşik faiz, basit faiz, tasarruf hedefleri ve yatırım getirisini hesaplayın.',
          keywords: 'finansal hesap makinesi, faiz hesaplama, yatırım hesaplama, tasarruf hesaplama, ROI hesaplama, ücretsiz finansal araçlar',
          structuredData: createStructuredData('Evrensel Finansal Hesap Makinesi', 'Bileşik faiz, basit faiz, tasarruf hedefleri ve ROI hesaplamalarını destekleyen kapsamlı bir finansal hesap makinesi.', 'tr')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Bileşik Faiz Hesaplayıcı | Gelecekteki Değer Yatırım Büyümesi',
          description: 'Bileşik faiz hesaplayıcımızla yatırımınızın gelecekteki değerini kolayca hesaplayın.',
          keywords: 'bileşik faiz hesaplayıcı, gelecek değer hesaplayıcı, yatırım büyümesi, emeklilik tasarrufları, finansal planlama',
          structuredData: createStructuredData('Bileşik Faiz Hesaplayıcı', 'Yatırımınızın gelecekteki değerini hesaplayın.', 'tr')
      }
  },
  pl: {
      default: {
          title: 'Uniwersalny Kalkulator Finansowy | Darmowe i dokładne narzędzie online',
          description: 'Oblicz procent składany, procent prosty, cele oszczędnościowe i ROI za pomocą naszego darmowego wielojęzycznego kalkulatora finansowego.',
          keywords: 'kalkulator finansowy, kalkulator odsetek, kalkulator inwestycyjny, kalkulator oszczędności, kalkulator ROI, darmowe narzędzia finansowe',
          structuredData: createStructuredData('Uniwersalny Kalkulator Finansowy', 'Kompleksowy kalkulator finansowy obsługujący procent składany, procent prosty, cele oszczędnościowe i obliczenia ROI.', 'pl')
      },
      [CalculatorType.COMPOUND_INTEREST]: {
          title: 'Kalkulator Procentu Składanego | Wzrost wartości przyszłej inwestycji',
          description: 'Łatwo oblicz przyszłą wartość swojej inwestycji za pomocą naszego kalkulatora procentu składanego.',
          keywords: 'kalkulator procentu składanego, kalkulator wartości przyszłej, wzrost inwestycji, oszczędności emerytalne, planowanie finansowe',
          structuredData: createStructuredData('Kalkulator Procentu Składanego', 'Oblicz przyszłą wartość swojej inwestycji.', 'pl')
      }
  }
};

export const getSeoData = (language: string, calculator: CalculatorType): SeoData => {
    const langSeo = seoConfig[language] || seoConfig.en;
    return langSeo[calculator] || langSeo.default;
};