var units = [
  "坦桑尼亚先令TZS",
  "乌克兰格里夫尼亚UAH",
  "乌干达先令UGX",
  "乌拉圭比索UYU",
  "乌兹别克斯坦索姆UZS",
  "越南盾VND",
  "瓦努阿图瓦图VUV",
  "萨摩亚塔拉WST",
  "东加勒比元XCD",
  "也门里亚尔YER",
  "南斯拉夫第纳尔YUN",
  "南非兰特ZAR",
  "赞比亚克瓦查ZMW",
  "欧元EUR",
  "美元USD",
  "英镑GBP",
  "加拿大元CAD",
  "澳大利亚元AUD",
  "安道尔法郎ADF",
  "阿联酋迪拉姆AED",
  "阿富汗阿富汗尼AFN",
  "阿尔巴尼亚列克ALL",
  "亚美尼亚打兰AMD",
  "荷属安的列斯盾ANG",
  "安哥拉宽扎AOA",
  "阿根廷比索ARS",
  "奥地利先令ATS",
  "澳大利亚元AUD",
  "阿鲁巴弗罗林AWG",
  "阿塞拜疆新马纳特AZN",
  "波斯尼亚马克BAM",
  "巴巴多斯元BBD",
  "孟加拉塔卡BDT",
  "比利时法郎BEF",
  "保加利亚列弗BGN",
  "巴林第纳尔BHD",
  "布隆迪法郎BIF",
  "百慕大元BMD",
  "文莱元BND",
  "玻利维亚诺BOB",
  "巴西雷亚尔BRL",
  "巴哈马元BSD",
  "不丹努尔特鲁姆BTN",
  "博茨瓦纳普拉BWP",
  "白俄罗斯卢布BYN",
  "伯利兹元BZD",
  "加拿大元CAD",
  "刚果法郎CDF",
  "瑞士法郎CHF",
  "智利比索CLP",
  "人民币CNY",
  "哥伦比亚比索COP",
  "哥斯达黎加科朗CRC",
  "捷克斯洛伐克克朗CSK",
  "古巴比索CUP",
  "佛得角埃斯库多CVE",
  "塞浦路斯镑CYP",
  "捷克克朗CZK",
  "德国马克DEM",
  "吉布提法郎DJF",
  "丹麦克朗DKK",
  "多米尼加共和国比索DOP",
  "阿尔及利亚第纳尔DZD",
  "厄瓜多尔苏克雷ECS",
  "爱沙尼亚克鲁恩EEK",
  "埃及镑EGP",
  "厄立特里亚纳克法ERN",
  "西班牙比塞塔ESP",
  "埃塞俄比亚比尔ETB",
  "芬兰马克FIM",
  "斐济元FJD",
  "马尔维纳斯群岛镑FKP",
  "法国法郎FRF",
  "格鲁吉亚拉里GEL",
  "加纳塞地GHC",
  "加纳新塞地GHS",
  "直布罗陀镑GIP",
  "冈比亚达拉西GMD",
  "几内亚法郎GNF",
  "希腊德拉克马GRD",
  "危地马拉格查尔GTQ",
  "圭亚那元GYD",
  "港元HKD",
  "洪都拉斯伦皮拉HNL",
  "克罗地亚库纳HRK",
  "海地古德HTG",
  "匈牙利福林HUF",
  "印度尼西亚卢比IDR",
  "爱尔兰镑IEP",
  "以色列新谢克尔ILS",
  "印度卢比INR",
  "伊拉克第纳尔IQD",
  "伊朗里亚尔IRR",
  "冰岛克朗ISK",
  "意大利里拉ITL",
  "牙买加元JMD",
  "约旦第纳尔JOD",
  "日元JPY",
  "肯尼亚先令KES",
  "吉尔吉斯斯坦索姆KGS",
  "柬埔寨瑞尔KHR",
  "科摩罗法郎KMF",
  "朝元KPW",
  "韩元KRW",
  "科威特第纳尔KWD",
  "开曼群岛元KYD",
  "哈萨克斯坦坚戈KZT",
  "老挝基普LAK",
  "黎巴嫩镑LBP",
  "斯里兰卢比LKR",
  "利比里亚元LRD",
  "莱索托洛蒂LSL",
  "立陶宛立特LTL",
  "卢森堡法郎LUF",
  "利比亚第纳尔LYD",
  "摩洛哥迪拉姆MAD",
  "摩尔多瓦列伊MDL",
  "马达加斯加阿里亚里MGA",
  "马其顿代纳尔MKD",
  "缅元MMK",
  "蒙古图格里克MNT",
  "澳门元MOP",
  "毛里塔尼亚乌吉亚MRO",
  "毛里求斯卢比MUR",
  "马尔代夫卢菲亚MVR",
  "马拉维克瓦查MWK",
  "墨西哥比索MXN",
  "马来西亚林吉特MYR",
  "莫桑比克新梅蒂卡尔MZN",
  "纳米比亚元NAD",
  "尼日利亚奈拉NGN",
  "尼加拉瓜科多巴NIO",
  "荷兰盾*NLG",
  "挪威克朗NOK",
  "尼泊尔卢比NPR",
  "新西兰元NZD",
  "阿曼里亚尔OMR",
  "巴拿马巴波亚PAB",
  "秘鲁新索尔PEN",
  "巴布亚新几内亚基那PGK",
  "菲律宾比索PHP",
  "巴基斯坦卢比PKR",
  "波兰兹罗提PLN",
  "巴拉圭瓜拉尼PYG",
  "卡塔尔里亚尔QAR",
  "罗马尼亚新列伊RON",
  "塞尔维亚第纳尔RSD",
  "俄罗斯卢布RUB",
  "卢旺达法郎RWF",
  "沙特里亚尔SAR",
  "所罗门群岛元SBD",
  "塞舌尔卢比SCR",
  "苏丹镑SDG",
  "瑞典克朗SEK",
  "新加坡元SGD",
  "圣赫勒拿镑SHP",
  "塞拉利昂利昂SLL",
  "索马里先令SOS",
  "苏里南元SRD",
  "圣多美和普林西比多布拉STD",
  "叙利亚镑SYP",
  "斯威士兰里兰吉尼SZL",
  "泰铢THB",
  "塔吉克斯坦索莫尼TJS",
  "土库曼斯坦新马纳特TMT",
  "突尼斯第纳尔TND",
  "汤加潘加TOP",
  "土耳其里拉TRY",
  "特立尼达和多巴哥元TTD",
  "台币TWD",
  "坦桑尼亚先令TZS",
  "乌克兰格里夫尼亚UAH",
  "乌干达先令UGX",
  "乌拉圭比索UYU",
  "乌兹别克斯坦索姆UZS",
  "委内瑞拉瓦尔VEF",
  "越南盾VND",
  "瓦努阿图瓦图VUV",
  "萨摩亚塔拉WST",
  "东加勒比元XCD",
  "也门里亚尔YER"
]
