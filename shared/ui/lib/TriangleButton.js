import Triangle from './svg/Triangle'
import triangleButtonClasses from './TriangleButton.module.css'

export default function TriangleButton ({
  slideDirection = 'y',
  onClick,
  customClasses = {},
  triangleStyle = {},
  width = 25,
  height = 25
}) {
  const isUpDownSlider = slideDirection === 'y'
  return (
    <button
      onClick={onClick}
      className={`
        ${customClasses}
        ${isUpDownSlider
        ? `${triangleButtonClasses.triangle_button_y}`
         : `${triangleButtonClasses.triangle_button_x}`}
          `}
    >
      <Triangle
        style={triangleStyle}
        width={width}
        height={height}
      />
    </button>
  )
}
