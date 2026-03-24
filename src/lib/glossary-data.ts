export interface GlossaryTerm {
  term: string        // Japanese display name
  termEn: string      // English name
  reading: string     // Katakana reading for sorting
  definition: string  // Japanese definition
  relatedTools?: string[]    // Tool slugs
  relatedCategories?: string[] // Category slugs
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ア行
  {
    term: 'アスペクト比',
    termEn: 'Aspect Ratio',
    reading: 'アスペクトヒ',
    definition: '画像の横と縦の比率。Midjourneyでは「--ar 16:9」のようにパラメータで指定可能。用途に応じて正方形(1:1)、横長(16:9)、縦長(9:16)などを選択します。',
    relatedTools: ['midjourney', 'stable-diffusion', 'dall-e'],
  },
  {
    term: 'アップスケール',
    termEn: 'Upscale',
    reading: 'アップスケール',
    definition: '低解像度の画像を高解像度に拡大する処理。AI画像生成では、まず低解像度で生成し、気に入った結果をアップスケールして高解像度版を得るワークフローが一般的です。',
    relatedTools: ['stable-diffusion', 'midjourney'],
  },
  {
    term: 'イン・コンテキスト学習',
    termEn: 'In-Context Learning',
    reading: 'インコンテキストガクシュウ',
    definition: 'プロンプト内に例を与えることで、モデルの動作を誘導するテクニック。Few-Shotプロンプティングの基盤となる概念で、追加の学習なしにモデルの出力パターンを制御できます。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'img2img',
    termEn: 'Image to Image',
    reading: 'イメージトゥイメージ',
    definition: '既存の画像を入力として、それを基に新しい画像を生成する手法。元画像の構図や色合いを維持しながら、スタイルや細部を変更できます。',
    relatedTools: ['stable-diffusion', 'midjourney'],
    relatedCategories: ['camera', 'anime'],
  },
  {
    term: 'インペインティング',
    termEn: 'Inpainting',
    reading: 'インペインティング',
    definition: '画像の一部をマスクで指定し、その部分だけをAIに再生成させる技術。不要なオブジェクトの除去や、特定の部分だけの修正に使用されます。',
    relatedTools: ['stable-diffusion', 'dall-e'],
  },
  {
    term: 'ウェイト',
    termEn: 'Weight / Emphasis',
    reading: 'ウェイト',
    definition: 'プロンプト内の特定のキーワードに対する重要度の指定。Stable Diffusionでは「(keyword:1.3)」のように数値で指定し、値が大きいほど強調されます。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'エージェント',
    termEn: 'AI Agent',
    reading: 'エージェント',
    definition: '自律的にタスクを計画・実行できるAIシステム。ツールの呼び出し、Web検索、コード実行など複数のアクションを組み合わせて、複雑な目標を達成します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'エンベディング',
    termEn: 'Embedding',
    reading: 'エンベディング',
    definition: 'テキストや画像などのデータを数値ベクトルに変換する技術。Stable Diffusionでは、特定のスタイルやキャラクターを学習したTextual Inversionファイルを指します。',
    relatedTools: ['stable-diffusion'],
  },
  // カ行
  {
    term: '過学習',
    termEn: 'Overfitting',
    reading: 'カガクシュウ',
    definition: 'モデルが学習データに過度に適合し、新しいデータに対する汎用性が低下した状態。LoRAやDreamBoothのファインチューニングで、学習ステップ数が多すぎると発生します。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: '拡散モデル',
    termEn: 'Diffusion Model',
    reading: 'カクサンモデル',
    definition: '画像にノイズを段階的に加え、逆にノイズを除去する過程を学習することで画像を生成するAIモデル。Stable Diffusion、DALL-E 3、Midjourneyの基盤技術です。',
    relatedTools: ['stable-diffusion', 'midjourney', 'dall-e'],
  },
  {
    term: 'ガイダンススケール',
    termEn: 'Guidance Scale / CFG Scale',
    reading: 'ガイダンススケール',
    definition: 'プロンプトへの忠実度を制御するパラメータ。Classifier-Free Guidance Scaleの略。値が高いほどプロンプトに忠実だが、高すぎると画像が不自然になる。一般的に7〜12が推奨。',
    relatedTools: ['stable-diffusion'],
    relatedCategories: ['camera', 'anime'],
  },
  {
    term: '画像生成AI',
    termEn: 'Image Generation AI',
    reading: 'ガゾウセイセイエーアイ',
    definition: 'テキストプロンプトから画像を自動生成するAI技術の総称。Stable Diffusion、Midjourney、DALL-Eが代表的。プロンプトの書き方で出力品質が大きく変わります。',
    relatedTools: ['stable-diffusion', 'midjourney', 'dall-e'],
  },
  {
    term: 'クオリティタグ',
    termEn: 'Quality Tags',
    reading: 'クオリティタグ',
    definition: '画像の品質を向上させるために使用するプロンプトキーワード。「masterpiece」「best quality」「highly detailed」「8k」などが一般的。ネガティブプロンプトと組み合わせて使用します。',
    relatedTools: ['stable-diffusion', 'midjourney'],
    relatedCategories: ['anime', 'camera'],
  },
  {
    term: 'コンテキストウィンドウ',
    termEn: 'Context Window',
    reading: 'コンテキストウィンドウ',
    definition: 'AIモデルが一度に処理できるテキストの最大長。トークン数で表され、モデルによって異なる（例：GPT-4は128K、Claude 3は200K）。長い文書の分析や複雑な会話に影響します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'コントロールネット',
    termEn: 'ControlNet',
    reading: 'コントロールネット',
    definition: 'Stable Diffusionの拡張機能。ポーズ検出、エッジ検出、深度マップなどの条件を追加入力として、構図やポーズを精密に制御できます。人物のポーズ指定に特に有効。',
    relatedTools: ['stable-diffusion'],
    relatedCategories: ['body-type', 'camera'],
  },
  // サ行
  {
    term: 'サンプラー',
    termEn: 'Sampler',
    reading: 'サンプラー',
    definition: '拡散モデルでノイズ除去を行うアルゴリズム。Euler、DPM++、DDIMなど複数の種類があり、速度と品質のバランスが異なる。一般的にDPM++ 2M KarrasやEuler aが高品質。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'サンプリングステップ',
    termEn: 'Sampling Steps',
    reading: 'サンプリングステップ',
    definition: '画像生成時のノイズ除去の反復回数。ステップ数が多いほど詳細な画像になるが、生成時間も増加する。一般的に20〜50ステップが推奨されます。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'シード値',
    termEn: 'Seed',
    reading: 'シードチ',
    definition: '乱数生成の初期値。同じプロンプト、パラメータ、シード値を使えば同じ画像を再現できる。気に入った結果のシード値を記録し、微調整に活用します。Midjourneyでは「--seed 数値」で指定。',
    relatedTools: ['stable-diffusion', 'midjourney'],
  },
  {
    term: '自然言語処理',
    termEn: 'Natural Language Processing (NLP)',
    reading: 'シゼンゲンゴショリ',
    definition: 'コンピュータが人間の言語を理解・生成する技術分野。ChatGPTやClaudeなどの大規模言語モデル（LLM）は、NLPの最新の成果です。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'ステーブルディフュージョン',
    termEn: 'Stable Diffusion',
    reading: 'ステーブルディフュージョン',
    definition: 'Stability AIが開発したオープンソースの画像生成AIモデル。ローカル環境で無料実行可能。Web UIやComfyUIなどのインターフェースを通じて使用し、拡張性の高さが特徴です。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'ストリーミング',
    termEn: 'Streaming',
    reading: 'ストリーミング',
    definition: 'AIの応答をリアルタイムで逐次表示する方式。全文生成完了を待たずにテキストが流れるように表示されるため、ユーザー体験が向上します。ChatGPTやClaudeで採用。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: '生成AI',
    termEn: 'Generative AI',
    reading: 'セイセイエーアイ',
    definition: 'テキスト、画像、音声、動画などの新しいコンテンツを生成できるAIの総称。ChatGPT（テキスト）、Stable Diffusion/Midjourney（画像）、Suno（音楽）などが代表例です。',
    relatedTools: ['chatgpt', 'claude', 'stable-diffusion', 'midjourney', 'dall-e', 'gemini'],
  },
  {
    term: 'ゼロショット',
    termEn: 'Zero-Shot',
    reading: 'ゼロショット',
    definition: '例を与えずに直接タスクを指示するプロンプティング手法。「以下のテキストの感情を分析してください」のように、例示なしで指示するだけの最もシンプルなアプローチ。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  // タ行
  {
    term: 'チェーン・オブ・ソート',
    termEn: 'Chain of Thought (CoT)',
    reading: 'チェーンオブソート',
    definition: '「ステップバイステップで考えてください」と指示し、AIに推論過程を明示させるテクニック。複雑な数学問題や論理的推論の精度が大幅に向上します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
    relatedCategories: ['programming', 'education'],
  },
  {
    term: 'チェックポイント',
    termEn: 'Checkpoint',
    reading: 'チェックポイント',
    definition: 'Stable Diffusionで使用するモデルファイル。学習済みの重みデータを含み、画風やスタイルが異なる。AnimagineXL（アニメ向け）、Realistic Vision（リアル向け）など用途別のモデルがあります。',
    relatedTools: ['stable-diffusion'],
    relatedCategories: ['anime'],
  },
  {
    term: 'テキスト生成',
    termEn: 'Text Generation',
    reading: 'テキストセイセイ',
    definition: 'AIがプロンプトに基づいて文章を自動生成する技術。記事作成、メール文面、コード生成、翻訳など幅広い用途に活用されます。ChatGPT、Claude、Geminiが代表的なツール。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
    relatedCategories: ['writing', 'programming'],
  },
  {
    term: 'トークン',
    termEn: 'Token',
    reading: 'トークン',
    definition: 'AIが文章を処理する最小単位。英語では1単語≒1トークン、日本語では1文字≒1〜3トークン。APIの料金やコンテキストウィンドウの制限はトークン数で計算されます。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'ドリームブース',
    termEn: 'DreamBooth',
    reading: 'ドリームブース',
    definition: '少数の画像（5〜20枚）から特定の被写体（人物、ペット、製品など）をモデルに学習させる技術。学習後は、その被写体を自由なシーンやスタイルで生成できます。',
    relatedTools: ['stable-diffusion'],
  },
  // ナ行
  {
    term: 'ネガティブプロンプト',
    termEn: 'Negative Prompt',
    reading: 'ネガティブプロンプト',
    definition: 'AI画像生成で「生成してほしくない要素」を指定するプロンプト。「bad hands, extra fingers, low quality, blurry」など品質低下要因を除外し、出力品質を大幅に向上させます。',
    relatedTools: ['stable-diffusion', 'midjourney'],
    relatedCategories: ['anime', 'hairstyle', 'clothing'],
  },
  // ハ行
  {
    term: 'ハイパーパラメータ',
    termEn: 'Hyperparameter',
    reading: 'ハイパーパラメータ',
    definition: 'モデルの学習や生成を制御する設定値。画像生成ではCFGスケール、サンプリングステップ、シード値など。テキスト生成ではtemperature、top_pなどが代表的です。',
    relatedTools: ['stable-diffusion', 'chatgpt', 'claude'],
  },
  {
    term: 'ハルシネーション',
    termEn: 'Hallucination',
    reading: 'ハルシネーション',
    definition: 'AIが事実と異なる情報をもっともらしく生成する現象。存在しない論文の引用や架空の事実の提示など。プロンプトで「確信がない場合はその旨を明記して」と指示することで軽減できます。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'バッチサイズ',
    termEn: 'Batch Size',
    reading: 'バッチサイズ',
    definition: '一度に生成する画像の枚数。バッチサイズを大きくすると比較選択の幅が広がりますが、VRAM使用量と生成時間が増加します。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'ファインチューニング',
    termEn: 'Fine-Tuning',
    reading: 'ファインチューニング',
    definition: '事前学習済みモデルを特定のタスクやデータセットで追加学習させる技術。LoRA、DreamBooth、Textual Inversionなどの手法があり、モデルの出力を特定の用途に最適化できます。',
    relatedTools: ['stable-diffusion', 'chatgpt'],
  },
  {
    term: 'フューショット',
    termEn: 'Few-Shot',
    reading: 'フューショット',
    definition: 'プロンプトに数個の入出力例を含めて、AIの出力パターンを誘導するテクニック。「例: 入力→出力」を2〜5個提示することで、タスクの理解と出力品質が向上します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
    relatedCategories: ['writing', 'business'],
  },
  {
    term: 'プロンプト',
    termEn: 'Prompt',
    reading: 'プロンプト',
    definition: 'AIに対する指示文。テキスト生成AIでは質問や指示の文章、画像生成AIでは生成したい画像の説明テキストを指します。プロンプトの質がAIの出力品質を直接左右する重要な要素です。',
    relatedTools: ['chatgpt', 'claude', 'stable-diffusion', 'midjourney', 'dall-e', 'gemini'],
  },
  {
    term: 'プロンプトエンジニアリング',
    termEn: 'Prompt Engineering',
    reading: 'プロンプトエンジニアリング',
    definition: 'AIから最適な出力を得るためにプロンプトを設計・最適化する技術。ロール設定、例示、制約条件の追加など、様々なテクニックを組み合わせてAIの性能を最大限に引き出します。',
    relatedTools: ['chatgpt', 'claude', 'stable-diffusion', 'midjourney', 'dall-e', 'gemini'],
  },
  {
    term: 'プロンプトインジェクション',
    termEn: 'Prompt Injection',
    reading: 'プロンプトインジェクション',
    definition: '悪意のある入力でAIの動作を意図しない方向に誘導するセキュリティ攻撃。システムプロンプトの漏洩や、制限の回避を試みる手法。AI開発者が対策すべき重要な課題です。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  // マ行
  {
    term: 'マルチモーダル',
    termEn: 'Multimodal',
    reading: 'マルチモーダル',
    definition: 'テキスト、画像、音声など複数の種類のデータを同時に処理できるAIの特性。GPT-4V、Claude 3、Geminiは画像理解が可能なマルチモーダルモデルです。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'ミッドジャーニー',
    termEn: 'Midjourney',
    reading: 'ミッドジャーニー',
    definition: 'Discord上で動作するAI画像生成サービス。アーティスティックで高品質な画像生成が特徴。「/imagine」コマンドでプロンプトを入力し、「--ar」「--v」などのパラメータで細かく制御します。',
    relatedTools: ['midjourney'],
  },
  // ラ行
  {
    term: 'RAG',
    termEn: 'Retrieval-Augmented Generation',
    reading: 'ラグ',
    definition: '外部データベースから関連情報を検索し、それをコンテキストとしてAIに与えることで、最新かつ正確な回答を生成する技術。ハルシネーション対策として企業で広く採用されています。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'LoRA',
    termEn: 'Low-Rank Adaptation',
    reading: 'ローラ',
    definition: '少ないデータとリソースでモデルを効率的にファインチューニングする手法。Stable Diffusionでは、特定のキャラクター、画風、ポーズなどを学習した小さなファイル（数MB〜数百MB）を追加してスタイルを変更できます。',
    relatedTools: ['stable-diffusion'],
    relatedCategories: ['anime', 'clothing'],
  },
  {
    term: 'ロール設定',
    termEn: 'Role Setting / System Prompt',
    reading: 'ロールセッテイ',
    definition: 'AIに特定の役割を演じさせるテクニック。「あなたはプロのライターです」のように役割を定義することで、専門性の高い回答や特定のトーンでの応答を引き出せます。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
    relatedCategories: ['writing', 'business', 'education'],
  },
  // 追加用語 ア行
  {
    term: 'アウトペインティング',
    termEn: 'Outpainting',
    reading: 'アウトペインティング',
    definition: '既存の画像の外側にAIが新しいコンテンツを生成して、画像を拡張する技術。元の画像のスタイルやコンテキストを維持しながら、キャンバスサイズを拡大できます。',
    relatedTools: ['stable-diffusion', 'dall-e'],
  },
  {
    term: 'API',
    termEn: 'Application Programming Interface',
    reading: 'エーピーアイ',
    definition: 'AIサービスをプログラムから利用するためのインターフェース。OpenAI API、Anthropic API、Google AI APIなどを通じて、アプリケーションにAI機能を組み込めます。',
    relatedTools: ['chatgpt', 'claude', 'gemini', 'dall-e'],
  },
  // カ行追加
  {
    term: 'VAE',
    termEn: 'Variational Autoencoder',
    reading: 'ブイエーイー',
    definition: 'Stable Diffusionで画像のエンコード・デコードを担当するコンポーネント。VAEの種類によって色味や細部の表現が変わる。カスタムVAEに差し替えることで、色の鮮やかさを改善できます。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'ComfyUI',
    termEn: 'ComfyUI',
    reading: 'コンフィユーアイ',
    definition: 'Stable Diffusionのノードベースの高度なUI。ワークフローを視覚的に構築でき、複雑な画像生成パイプラインをカスタマイズできます。上級者向けだが柔軟性が非常に高い。',
    relatedTools: ['stable-diffusion'],
  },
  // サ行追加
  {
    term: 'システムプロンプト',
    termEn: 'System Prompt',
    reading: 'システムプロンプト',
    definition: 'AIの動作方針を設定する特別なプロンプト。ユーザーからの入力の前に処理され、AIの人格、制約、出力形式などを定義します。API利用時にsystem messageとして設定します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
    relatedCategories: ['programming'],
  },
  {
    term: 'SDXL',
    termEn: 'Stable Diffusion XL',
    reading: 'エスディーエックスエル',
    definition: 'Stable Diffusionの高解像度版モデル。1024×1024ピクセルのネイティブ解像度で生成可能。ベースモデルとリファイナーの2段階生成により、より高品質な画像を出力します。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'CLIP',
    termEn: 'Contrastive Language-Image Pre-Training',
    reading: 'クリップ',
    definition: 'テキストと画像の関連性を理解するモデル。Stable Diffusionでプロンプトのテキストを解釈する部分に使用されています。CLIPの理解がプロンプトの効果を左右します。',
    relatedTools: ['stable-diffusion'],
  },
  // タ行追加
  {
    term: 'txt2img',
    termEn: 'Text to Image',
    reading: 'テキストトゥイメージ',
    definition: 'テキストプロンプトから画像を生成する最も基本的な機能。プロンプトに記述した内容をAIが解釈し、画像として出力します。img2imgと対比される基本モード。',
    relatedTools: ['stable-diffusion', 'midjourney', 'dall-e'],
  },
  {
    term: 'デノイジング強度',
    termEn: 'Denoising Strength',
    reading: 'デノイジングキョウド',
    definition: 'img2img生成時に元画像をどの程度変更するかの指標。0に近いと元画像に忠実、1に近いと大きく変更される。0.3〜0.7が一般的な範囲です。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'temperature',
    termEn: 'Temperature',
    reading: 'テンペラチャー',
    definition: 'AIの出力のランダム性を制御するパラメータ。0に近いと確定的で一貫した出力、1以上では創造的で多様な出力になる。正確さ重視→低め、創造性重視→高めに設定します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  // ナ行追加
  {
    term: 'ノイズ除去',
    termEn: 'Denoising',
    reading: 'ノイズジョキョ',
    definition: '拡散モデルの画像生成プロセスの核心。ランダムノイズから段階的にノイズを取り除いてクリアな画像を作り出す。サンプラーとステップ数がこのプロセスの品質を決定します。',
    relatedTools: ['stable-diffusion', 'midjourney', 'dall-e'],
  },
  // ハ行追加
  {
    term: 'パラメータ',
    termEn: 'Parameter',
    reading: 'パラメータ',
    definition: 'Midjourneyでプロンプトの末尾に追加する設定値。「--ar 16:9」（アスペクト比）、「--v 6」（バージョン）、「--chaos 50」（多様性）、「--q 2」（品質）などがあります。',
    relatedTools: ['midjourney'],
  },
  {
    term: 'ハイレゾフィックス',
    termEn: 'Hires Fix',
    reading: 'ハイレゾフィックス',
    definition: 'Stable Diffusionで高解像度画像を生成する際のテクニック。まず低解像度で生成し、アップスケーラーで拡大後にimg2imgで詳細を追加する2段階プロセスで高品質な大画像を得ます。',
    relatedTools: ['stable-diffusion'],
    relatedCategories: ['camera'],
  },
  {
    term: 'FLUX',
    termEn: 'FLUX',
    reading: 'フラックス',
    definition: 'Black Forest Labsが開発した最新の画像生成モデル。Stable Diffusionの開発者が手掛けた次世代モデルで、テキスト描画やプロンプト理解力に優れています。',
    relatedTools: ['stable-diffusion'],
  },
  // マ行追加
  {
    term: 'マスク',
    termEn: 'Mask',
    reading: 'マスク',
    definition: 'インペインティングで編集する領域を指定するための白黒画像。白い部分がAIによって再生成され、黒い部分は元の画像が保持されます。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'モデルマージ',
    termEn: 'Model Merge',
    reading: 'モデルマージ',
    definition: '複数のAIモデルの特徴を融合して新しいモデルを作成する技術。異なるモデルの長所を組み合わせて、独自の画風やスタイルを持つカスタムモデルを作れます。',
    relatedTools: ['stable-diffusion'],
  },
  // ヤ行
  {
    term: '要約',
    termEn: 'Summarization',
    reading: 'ヨウヤク',
    definition: 'AIに長い文章を短くまとめさせるタスク。「3行で要約して」「箇条書きで5点にまとめて」のように出力形式を指定すると効果的です。レポートや議事録の処理に活用されます。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
    relatedCategories: ['business', 'writing'],
  },
  // ワ行
  {
    term: 'Web UI',
    termEn: 'Web UI (AUTOMATIC1111)',
    reading: 'ウェブユーアイ',
    definition: 'Stable Diffusionの最も普及しているブラウザベースインターフェース。AUTOMATIC1111が開発。txt2img、img2img、インペインティングなどの機能をGUIで操作でき、拡張機能も豊富です。',
    relatedTools: ['stable-diffusion'],
  },
  // 追加の重要用語
  {
    term: 'DALL-E',
    termEn: 'DALL-E',
    reading: 'ダリ',
    definition: 'OpenAIが開発した画像生成AIモデル。テキストから高品質な画像を生成でき、DALL-E 3はChatGPTとの統合により自然言語での指示が可能。安全性フィルターが厳格に設定されています。',
    relatedTools: ['dall-e'],
  },
  {
    term: 'ChatGPT',
    termEn: 'ChatGPT',
    reading: 'チャットジーピーティー',
    definition: 'OpenAIが開発した対話型AI。GPT-4をベースに、自然な会話形式でタスクを処理。プラグイン、DALL-E統合、Code Interpreterなどの機能を持つ、最も広く使われているAIツール。',
    relatedTools: ['chatgpt'],
  },
  {
    term: 'Claude',
    termEn: 'Claude',
    reading: 'クロード',
    definition: 'Anthropicが開発した対話型AI。長文の理解と分析に優れ、200Kトークンの長いコンテキストウィンドウが特徴。安全性と有用性のバランスを重視した設計で、コーディングや文章作成に強い。',
    relatedTools: ['claude'],
  },
  {
    term: 'Gemini',
    termEn: 'Gemini',
    reading: 'ジェミニ',
    definition: 'Googleが開発したマルチモーダルAI。テキスト、画像、コードの理解と生成に対応。Google検索やWorkspaceとの深い統合が特徴で、最新情報へのアクセスが強み。',
    relatedTools: ['gemini'],
  },
  {
    term: '大規模言語モデル',
    termEn: 'Large Language Model (LLM)',
    reading: 'ダイキボゲンゴモデル',
    definition: '膨大なテキストデータで学習された巨大なニューラルネットワーク。GPT-4、Claude、Gemini、Llamaなどが代表例。テキスト生成、翻訳、要約、コード生成など多様なタスクに対応します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'トップP',
    termEn: 'Top-P (Nucleus Sampling)',
    reading: 'トップピー',
    definition: 'AIの出力トークン選択を制御するパラメータ。累積確率がPに達するまでの上位トークンのみから次のトークンを選択する。temperatureと組み合わせて出力の多様性を調整します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'Textual Inversion',
    termEn: 'Textual Inversion',
    reading: 'テクスチュアルインバージョン',
    definition: 'Stable Diffusionで新しいコンセプトや概念を少数の画像から学習し、プロンプト内で使用できるようにする技術。エンベディングファイルとして保存され、特定の画風やオブジェクトを再現できます。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'Transformer',
    termEn: 'Transformer',
    reading: 'トランスフォーマー',
    definition: '2017年にGoogleが発表した深層学習アーキテクチャ。注意機構（Attention）を核とし、GPT、BERT、Stable Diffusionなど現代のほぼすべてのAIモデルの基盤技術です。',
    relatedTools: ['chatgpt', 'claude', 'stable-diffusion', 'gemini'],
  },
  {
    term: 'Attention',
    termEn: 'Attention Mechanism',
    reading: 'アテンション',
    definition: 'AIモデルが入力データの各部分に異なる「注目度」を割り当てる機構。Transformerの核心技術であり、Self-Attention（自己注意）とCross-Attention（交差注意）の2種類が画像生成で重要です。',
    relatedTools: ['stable-diffusion', 'chatgpt', 'claude'],
  },
  {
    term: 'Latent Space',
    termEn: 'Latent Space',
    reading: 'レイテントスペース',
    definition: 'AIモデルが学習したデータの圧縮表現空間。Stable Diffusionでは画像をピクセル空間ではなく潜在空間でノイズ除去することで、計算効率を大幅に向上させています。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'ワンショット',
    termEn: 'One-Shot',
    reading: 'ワンショット',
    definition: 'プロンプトに1つだけ例を与えてタスクの理解を助けるテクニック。ゼロショット（例なし）とフューショット（複数例）の中間的なアプローチで、最小限の例で効果的に指示できます。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    term: 'リファイナー',
    termEn: 'Refiner',
    reading: 'リファイナー',
    definition: 'SDXLで使用される2段階目の処理モデル。ベースモデルが生成した画像に対して、細部の品質を向上させ、テクスチャやディテールを改善する役割を持ちます。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: '解像度',
    termEn: 'Resolution',
    reading: 'カイゾウド',
    definition: '画像のピクセル数。SD1.5は512×512、SDXLは1024×1024がネイティブ解像度。学習解像度と大きく異なる設定で生成すると品質が低下するため、モデルに合った解像度の選択が重要です。',
    relatedTools: ['stable-diffusion', 'midjourney', 'dall-e'],
    relatedCategories: ['camera'],
  },
  {
    term: 'プロンプトテンプレート',
    termEn: 'Prompt Template',
    reading: 'プロンプトテンプレート',
    definition: '再利用可能なプロンプトの雛形。変数（{トピック}、{対象者}など）を含み、用途に応じて値を差し替えることで、一貫した品質のプロンプトを効率的に作成できます。',
    relatedTools: ['chatgpt', 'claude', 'stable-diffusion', 'midjourney'],
    relatedCategories: ['writing', 'business'],
  },
  {
    term: 'VRAM',
    termEn: 'Video RAM',
    reading: 'ブイラム',
    definition: 'GPUに搭載されたビデオメモリ。Stable Diffusionのローカル実行には最低4GB、快適な利用には8GB以上のVRAMが必要。高解像度やバッチ生成ではより多くのVRAMを消費します。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'Stable Diffusion 3',
    termEn: 'Stable Diffusion 3',
    reading: 'ステーブルディフュージョンスリー',
    definition: 'Stability AIが開発したSD系列の最新モデル。MMDiT（マルチモーダルDiffusion Transformer）アーキテクチャを採用し、テキスト描画能力とプロンプト理解力が大幅に向上。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'Function Calling',
    termEn: 'Function Calling / Tool Use',
    reading: 'ファンクションコーリング',
    definition: 'AIモデルが外部の関数やAPIを呼び出す機能。検索、計算、データベース操作などのツールを定義し、AIが適切なタイミングで自動的にツールを選択・実行します。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
    relatedCategories: ['programming'],
  },
  {
    term: 'Aesthetic Score',
    termEn: 'Aesthetic Score',
    reading: 'エステティックスコア',
    definition: '画像の美的品質を数値で評価するスコア。SDXLの学習データでは美的スコアが高い画像が優先的に使用されており、生成画像の品質に直接影響します。',
    relatedTools: ['stable-diffusion'],
  },
  {
    term: 'JSONモード',
    termEn: 'JSON Mode',
    reading: 'ジェイソンモード',
    definition: 'AIの出力を有効なJSON形式に制限するモード。APIで構造化データを取得する際に使用し、プログラムからの解析が容易になります。OpenAI APIやClaude APIで利用可能。',
    relatedTools: ['chatgpt', 'claude'],
    relatedCategories: ['programming'],
  },
  {
    term: 'ビジョン',
    termEn: 'Vision / Image Understanding',
    reading: 'ビジョン',
    definition: 'AIが画像を理解・分析する能力。GPT-4V、Claude 3、Geminiなどのマルチモーダルモデルは、画像内のテキスト読取、図表の解析、写真の説明などが可能です。',
    relatedTools: ['chatgpt', 'claude', 'gemini'],
  },
]

// Group terms by their first katakana character's row (ア行, カ行, etc.)
export function getGlossaryGrouped(): Array<{ group: string; terms: GlossaryTerm[] }> {
  const sorted = [...GLOSSARY_TERMS].sort((a, b) => a.reading.localeCompare(b.reading, 'ja'))

  const groups: Record<string, GlossaryTerm[]> = {}
  const rowMap: Record<string, string> = {
    'ア': 'ア行', 'イ': 'ア行', 'ウ': 'ア行', 'エ': 'ア行', 'オ': 'ア行',
    'カ': 'カ行', 'キ': 'カ行', 'ク': 'カ行', 'ケ': 'カ行', 'コ': 'カ行',
    'ガ': 'カ行', 'ギ': 'カ行', 'グ': 'カ行', 'ゲ': 'カ行', 'ゴ': 'カ行',
    'サ': 'サ行', 'シ': 'サ行', 'ス': 'サ行', 'セ': 'サ行', 'ソ': 'サ行',
    'ザ': 'サ行', 'ジ': 'サ行', 'ズ': 'サ行', 'ゼ': 'サ行', 'ゾ': 'サ行',
    'タ': 'タ行', 'チ': 'タ行', 'ツ': 'タ行', 'テ': 'タ行', 'ト': 'タ行',
    'ダ': 'タ行', 'ヂ': 'タ行', 'ヅ': 'タ行', 'デ': 'タ行', 'ド': 'タ行',
    'ナ': 'ナ行', 'ニ': 'ナ行', 'ヌ': 'ナ行', 'ネ': 'ナ行', 'ノ': 'ナ行',
    'ハ': 'ハ行', 'ヒ': 'ハ行', 'フ': 'ハ行', 'ヘ': 'ハ行', 'ホ': 'ハ行',
    'バ': 'ハ行', 'ビ': 'ハ行', 'ブ': 'ハ行', 'ベ': 'ハ行', 'ボ': 'ハ行',
    'パ': 'ハ行', 'ピ': 'ハ行', 'プ': 'ハ行', 'ペ': 'ハ行', 'ポ': 'ハ行',
    'マ': 'マ行', 'ミ': 'マ行', 'ム': 'マ行', 'メ': 'マ行', 'モ': 'マ行',
    'ヤ': 'ヤ行', 'ユ': 'ヤ行', 'ヨ': 'ヤ行',
    'ラ': 'ラ行', 'リ': 'ラ行', 'ル': 'ラ行', 'レ': 'ラ行', 'ロ': 'ラ行',
    'ワ': 'ワ行', 'ヲ': 'ワ行', 'ン': 'ワ行',
  }

  const rowOrder = ['ア行', 'カ行', 'サ行', 'タ行', 'ナ行', 'ハ行', 'マ行', 'ヤ行', 'ラ行', 'ワ行']

  for (const term of sorted) {
    const firstChar = term.reading[0]
    const group = rowMap[firstChar] || 'その他'
    if (!groups[group]) groups[group] = []
    groups[group].push(term)
  }

  return rowOrder.filter(g => groups[g]).map(g => ({ group: g, terms: groups[g] }))
}

// Generate anchor ID from term
export function termToId(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '-').replace(/-+/g, '-')
}
