import type { PromptParamsConfig } from '../types'

export const config: PromptParamsConfig = {
  params: [
    {
      id: 'dinosaurType',
      type: 'select',
      label: '恐竜の種類',
      match: 'cartoon brontosaurus dinosaur',
      options: [
        { value: 'cartoon brontosaurus dinosaur', label: 'ブロントサウルス（デフォルト）' },
        { value: 'cartoon tyrannosaurus rex dinosaur', label: 'ティラノサウルス' },
        { value: 'cartoon stegosaurus dinosaur', label: 'ステゴサウルス' },
        { value: 'cartoon triceratops dinosaur', label: 'トリケラトプス' },
        { value: 'cartoon pterodactyl flying dinosaur', label: 'プテラノドン' },
        { value: 'cartoon baby diplodocus dinosaur', label: '赤ちゃんディプロドクス' },
      ],
    },
    {
      id: 'scene',
      type: 'select',
      label: 'シーン',
      match: 'standing in a simple jungle scene with two palm trees and a few outlined ferns',
      options: [
        { value: 'standing in a simple jungle scene with two palm trees and a few outlined ferns', label: 'ジャングル（デフォルト）' },
        { value: 'standing in a simple prehistoric valley with rocks and volcanic mountains in outline', label: '原始の谷' },
        { value: 'walking on a grassy plain with simple cloud outlines above', label: '草原' },
        { value: 'near a simple lake with outlined waves and a few reeds', label: '湖辺' },
        { value: 'on a simple snowy mountain with outlined snowflakes', label: '雪山' },
      ],
    },
    {
      id: 'expression',
      type: 'select',
      label: '表情',
      match: 'a big smile, round eyes drawn as outlined circles',
      options: [
        { value: 'a big smile, round eyes drawn as outlined circles', label: '笑顔（デフォルト）' },
        { value: 'a happy laughing face, eyes drawn as outlined curved arcs', label: '笑い顔' },
        { value: 'a curious expression, eyes drawn as wide outlined circles', label: '好奇心' },
        { value: 'a sleepy face, eyes drawn as outlined half-circles', label: '眠そう' },
        { value: 'a friendly waving pose, gentle smile, eyes drawn as outlined circles', label: '手を振る' },
      ],
    },
  ],
}
