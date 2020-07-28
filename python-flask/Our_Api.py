import flask
from flask import request,jsonify
import pymysql
from bs4 import BeautifulSoup
from selenium import webdriver
import sys

app=flask.Flask(__name__)
app.config['DEBUG']= True

def dict_factory(cursor, row):
	d = {}
	for idx, col in enumerate(cursor.description):
		d[col[0]] = row[idx]
	return d

def flipkart_phones(name):
	driver = webdriver.PhantomJS(executable_path=r'C:\Users\PRITALEE\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\phantomjs.exe')

	#name= "oppo"#sys.argv[1]   #"iphone" #input()
	name=name.replace(" ","%20")
	#print(name)
	url = "https://www.flipkart.com/search?q="+name+"&marketplace=FLIPKART&otracker=start&as-show=off&as=off"
	driver.get(url)
	l1=[]
	soup=BeautifulSoup(driver.page_source,'lxml')
	t=soup.find('div',class_='_1HmYoV _35HD7C col-10-12')
	dummy=t.find('div',class_='bhgxx2 col-12-12')
	real=t.find_all('div',class_='bhgxx2 col-12-12')
	#real=real.remove(dummy)
	for i in t.find_all('div',class_='bhgxx2 col-12-12')[0:7]:
		l=[]
		#print(i.text)f
		#print('------------------------------------------------------------------------------')
		if(i.find('div',class_='_3wU53n')!=None):
			tp=i.find('div',class_='_3wU53n').text.split('(')
			l.append(tp[0].strip())
			l.append(tp[1].split(',')[0].strip())
			if(len(tp[1].split(','))==2):
				l.append(tp[1].split(',')[1].replace(")","").strip())
			else:
				l.append("unavailable")
		if (i.find('div', class_='hGSR34 _2beYZw') != None):
			l.append(i.find('div',class_='hGSR34 _2beYZw').text)
		if (i.find('div', class_='_1vC4OE _2rQ-NK') != None):
			#print(i.find('div',class_='_1vC4OE _2rQ-NK'))
			l.append(i.find('div',class_='_1vC4OE _2rQ-NK').text)
			l.append(i.find('a',class_="_31qSD5")['href'])
			l.append(i.find('a',class_="_31qSD5").find('img')['src'])
		
		l1.append(l)
		print(l)
		
	l1=l1[1:len(l1)-1]
	#print(l1)
	return(l1)
#<img class="_1Nyybr  _30XEf0" alt="Apple iPhone 7 (Black, 32 GB)" src="https://rukminim1.flixcart.com/image/312/312/mobile/7/e/e/apple-iphone-7-na-original-imaemzee435f9gpu.jpeg?q=70">
def amazon_phones(name):
	driver = webdriver.PhantomJS(executable_path=r'C:\Users\PRITALEE\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\phantomjs.exe')

	#name = "oppo"#sys.argv[1]#"iphone"
	#print(name)
	url = 'https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + name + '&rh=i%3Aaps%2Ck%3A' + name
	driver.get(url)

	soup = BeautifulSoup(driver.page_source, 'lxml')
	t = soup.find('div', id='resultsCol')
	l1 = []
	for i in t.find_all('div', class_='a-fixed-left-grid')[0:7]:
		t1 = i.find_all('div', class_='a-row a-spacing-none')
		l = []
		l.append(t1[0].text.split('(')[0])
		if (len(t1[0].text.split('('))==2 and ',' in t1[0].text.split('(')[1]):
			l.append(t1[0].text.split('(')[1].split(',')[0])  #if(len(t1[0].text.split('(')[1].split(','))==2):
			l.append(t1[0].text.split('(')[1].split(',')[1].replace(")","").strip())
		else:
			l.append("Unavailable")
			l.append("Unavailable")
		
		if(i.find('span', class_='a-size-base a-color-price s-price a-text-bold')!= None): 
			l.append(i.find('span', class_='a-size-base a-color-price s-price a-text-bold').text)
		else:
			l.append("0")
		l.append(i.find('span', class_='a-icon-alt').text)
		l.append(i.find('a',class_='a-link-normal a-text-normal')['href'])
		l.append(i.find('a',class_='a-link-normal a-text-normal').find('img')['src'])
		print(l)
		l1.append(l)
		
	return(l1)





@app.route('/',methods=['GET'])
def home():
	return ''' <h1>HELLO AND WELCOME TO OUR API - ELCOMP </h1>'''

@app.route('/api/v1/phones_update_1',methods=['POST'])
def update_phones_1():
	print("hiee")
	query_param=request.get_json('brand')
	brand =query_param['brand']
	flip1= flipkart_phones(brand)
	amaz1= amazon_phones(brand)
	conn = pymysql.connect(host='127.0.0.1', user='root', passwd=None, db='test1')
	cur = conn.cursor()
	cur.execute("TRUNCATE TABLE amazon1");
	for i in range(0,len(amaz1)-1):
		print(i)
		sql = 'INSERT INTO amazon1 VALUES ("'+(amaz1[i][0]).encode('utf-8')+'","'+(amaz1[i][1]).encode('utf-8')+'","'+(amaz1[i][2]).encode('utf-8')+'","'+(amaz1[i][3]).encode('utf-8')+'","'+(amaz1[i][4]).encode('utf-8')+'","amazon","'+(amaz1[i][5]).encode('utf-8')+'","'+(amaz1[i][6]).encode('utf-8')+'")'#val=tuple(l[0])
		cur.execute(sql)

	conn.commit()
	for i in range(0,len(flip1)-1):
		print(i)
		sql = 'INSERT INTO amazon1 VALUES ("'+(flip1[i][0]).encode('utf-8')+'","'+(flip1[i][1]).encode('utf-8')+'","'+(flip1[i][2]).encode('utf-8')+'","'+(flip1[i][4]).encode('utf-8')+'","'+(flip1[i][3]).encode('utf-8')+'","flipkart","'+(flip1[i][5]).encode('utf-8')+'","'+(flip1[i][6]).encode('utf-8')+'")'#val=tuple(l[0])
		cur.execute(sql)

	conn.commit()
	cur.close()
	conn.close()
	return jsonify({'response':'Success'})
#<a class="a-link-normal a-text-normal" href="https://www.amazon.in/Apple-iPhone-Space-Grey-Storage/dp/B072LPF91D/ref=sr_1_1?s=electronics&amp;ie=UTF8&amp;qid=1540542882&amp;sr=1-1&amp;keywords=apple+iphone+x"><img src="https://images-eu.ssl-images-amazon.com/images/I/31Rx3z7Yf3L._AC_US218_FMwebp_QL70_.jpg" srcset="https://images-eu.ssl-images-amazon.com/images/I/31Rx3z7Yf3L._AC_US218_FMwebp_QL70_.jpg 1x, https://images-eu.ssl-images-amazon.com/images/I/31Rx3z7Yf3L._AC_US327_FMwebp_QL65_.jpg 1.5x, https://images-eu.ssl-images-amazon.com/images/I/31Rx3z7Yf3L._AC_US436_FMwebp_QL65_.jpg 2x, https://images-eu.ssl-images-amazon.com/images/I/31Rx3z7Yf3L._AC_US500_FMwebp_QL65_.jpg 2.2935x" width="218" height="218" alt="Apple iPhone X (Space Grey, 3GB RAM, 64GB Storage)" class="s-access-image cfMarker" data-search-image-load=""></a>


@app.route('/api/v1/phones_update_2',methods=['POST'])
def update_phone_2():
	query_param=request.get_json('brand')
	brand =query_param['brand']
	conn = pymysql.connect(host='127.0.0.1', user='root', passwd=None, db='test1')
	cur = conn.cursor()
	#conn.row_factory = dict_factory
	l1=cur.execute('SELECT * FROM amazon1')

	return jsonify(l1)

app.run(host='localhost', port=5000)
