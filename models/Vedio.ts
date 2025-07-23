import mongoose, { model, models, Schema } from "mongoose"

export const VEDIO_DIMENSIONS = {
      width: 1080,
      height: 1920
} as const

export interface IVedio {
      _id: mongoose.Types.ObjectId,
      title: string,
      desc: string,
      vedioUrl: string,
      thumbnailUrl: string,
      controls?: boolean,
      transformation?: {
            height: number,
            width: number,
            quality?: number
      }
}

const vedioSchema = new Schema<IVedio>(
      {
            title: { type: String, required: true },
            desc: { type: String, required: true },
            vedioUrl: { type: String, required: true },
            thumbnailUrl: { type: String, required: true },
            controls: { type: Boolean, required: true },
            transformation: {
                  height: { type: Number, default: VEDIO_DIMENSIONS.height },
                  width: { type: Number, default: VEDIO_DIMENSIONS.width },
                  quality: { type: Number, min: 1, max: 100 }
            }
      }, {
      timestamps: true
}
)


const Video = models?.Video || model<IVedio>("Video", vedioSchema)

export default Video;