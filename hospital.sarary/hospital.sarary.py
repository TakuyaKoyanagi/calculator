import fitz  # PyMuPDF

pdf_path = "list2024-ippan.pdf"  # PDFファイルのパス

doc = fitz.open(pdf_path)

results = []

for page_num, page in enumerate(doc):
    links = page.get_links()
    for link in links:
        uri = link.get("uri", "")
        rect = link["from"]
        # リンクに対応するテキストを取得
        words = page.get_text("words")  # 全ての単語情報（座標付き）
        text = ""
        for w in words:
            x0, y0, x1, y1, word, *_ = w
            # リンクの領域に含まれる文字だけ抽出
            if (x0 >= rect.x0 and x1 <= rect.x1) and (y0 >= rect.y0 and y1 <= rect.y1):
                text += word
        if text and uri:
            results.append({"病院名": text, "URL": uri})

# 確認表示
for r in results[:5]:
    print(f"{r['病院名']} -> {r['URL']}")