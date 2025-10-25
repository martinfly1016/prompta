import { Info } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">設定</h1>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 flex gap-3">
        <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-blue-900 dark:text-blue-200">この機能は準備中です</h3>
          <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
            サイト設定やSEO設定などの管理機能は、近々実装予定です。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">サイト設定</h3>
          <p className="text-sm text-muted-foreground">
            サイトタイトル、説明、ロゴなどを管理します。
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">SEO設定</h3>
          <p className="text-sm text-muted-foreground">
            メタタグやサイトマップの設定を管理します。
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">ユーザー管理</h3>
          <p className="text-sm text-muted-foreground">
            管理者とエディターのアカウントを管理します。
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">バックアップ</h3>
          <p className="text-sm text-muted-foreground">
            データベースをエクスポート・インポートします。
          </p>
        </div>
      </div>
    </div>
  )
}
