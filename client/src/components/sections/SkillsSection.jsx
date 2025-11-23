import React from "react";
import { useController } from "react-hook-form";

const SkillInput = ({ control, index, errors, onRemove }) => {
  const {
    field,
  } = useController({
    name: `skills.${index}.skill`,
    control,
    rules: { required: "Skill is required" },
  });

  return (
    <div className="flex items-center space-x-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex-1">
        <input
          {...field}
          type="text"
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${errors.skills?.[index]?.skill ? "border-red-500" : "border-gray-300"
            }`}
          placeholder="e.g., JavaScript, Python"
        />
        {errors.skills?.[index]?.skill && (
          <p className="mt-1 text-sm text-red-600">
            {errors.skills[index].skill.message}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
        title="Remove skill"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

const SkillsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Skill</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-lg font-sans  font-medium">No skills added yet</p>
          <p className="text-sm">Click "Add Skill" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <SkillInput
              key={field.id}
              control={control}
              index={index}
              errors={errors}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
