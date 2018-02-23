
import rethinkdb as r
from pytz import timezone
from datetime import datetime

conn = r.connect(host='45.55.162.243',
                 port=28015,
                 db='iot',
                 user='admin',
                 password='8V6-Zco-5ux-EMu')
a =  datetime(2018, 01, 27, 0, 0, 0)
p = timezone('UTC')
z =  p.localize(a)
result = r.table('devices').count(lambda data:
  # Query between dates.
  data['date'] < datetime.now(timezone('UTC')) and
  data['date'] > z
).run(conn)


print result
