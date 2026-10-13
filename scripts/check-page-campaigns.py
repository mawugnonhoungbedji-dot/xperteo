from html.parser import HTMLParser
from urllib.request import urlopen
from collections import Counter
import json

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.anchors = []
        self.stages = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "a" and attrs.get("href", "").startswith("#"):
            self.anchors.append(attrs["href"][1:])
        if tag == "section" and "brand-stage" in attrs.get("class", "").split():
            self.stages += 1

routes = ["/", "/services", "/methodology", "/about", "/resources", "/contact", "/diagnostic", "/faq", "/case-studies", "/privacy", "/terms", "/services/seo", "/resources/preparer-refonte-site", "/case-studies/benin-royal-couture"]
results = []
for route in routes:
    with urlopen("http://127.0.0.1:3000" + route, timeout=90) as response:
        page = Page()
        page.feed(response.read().decode("utf-8"))
    duplicates = [key for key, value in Counter(page.ids).items() if value > 1]
    missing = sorted(set(page.anchors) - set(page.ids))
    results.append({"route": route, "stages": page.stages, "duplicate_ids": duplicates, "missing_anchors": missing})
print(json.dumps(results, ensure_ascii=False))
assert all(r["stages"] >= 2 and not r["duplicate_ids"] and not r["missing_anchors"] for r in results)
